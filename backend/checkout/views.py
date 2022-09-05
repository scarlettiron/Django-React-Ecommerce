from asyncio.windows_events import NULL
from itertools import product
from rest_framework import generics, response
from .stripe_utils import StripePaymentIntent as stIntent, StripeWebhooks
from products.models import Product, ProductPackage
import stripe
from decouple import config
import json


intent_success_webhook_secret = config('intent_success_webhook_secret')

# for checking out with stripe 

class stripe_intent(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        #Format for list needed by this endpoint
        #{
        #  products:{
        #       packagePk:{product:pk of product, quantity:quantity of products being purchased
        #      }
        #  shipping:{street:streetadress},
        #  etc... 
        #}
        data = self.request.data
        packageKeys = [int(x) for x in data['products'].keys()]
        products = data['products']

        try:
            packages = ProductPackage.objects.filter(pk__in = packageKeys).select_related('product')
        except:
            return response.Response("Products not found", status=404)
        
        subtotal = 0
        
        for item in packages:
            #make sure package belongs to product user is attempting to buy
            purchasingPackage = products[str(item.pk)]
            if item.product.pk != purchasingPackage['product']:
                return response.Response("invalid request", status=401)
            #make sure there is enough of the product in stock
            if item.product.inventory < purchasingPackage['quantity']:
                return response.Response("not enough stock", status=404)
            
            #add item * quantity price to subtotal
            subtotal += item.price * purchasingPackage['quantity']

        if self.request.user.is_authenticated:
            instance = stIntent(subtotal, products, shipping = data['shipping'], first_name = data['first_name'],
                                last_name = data['last_name'], phone = data['phone'], 
                                email = data['email'], user = request.user)
            intent = instance.LoggedInIntent().intent

        else:
            instance = stIntent(subtotal, products, shipping = data['shipping'], first_name = data['first_name'],
                                last_name = data['last_name'], phone = data['phone'], 
                                email = data['email'])
            intent = instance.NoLoginIntent().intent
        
        #make sure session url was successfully returned    
        if not intent:
            return response.Response("error trying to create session, try again later", status = 400)
        
        return response.Response({"intent":intent['client_secret']}, status=201)
            


class stripe_intent_webhook(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        event = None
        payload = request.data
        
        #event = json.loads(payload)
        event = payload
        
        sig_header = request.headers.get('STRIPE_SIGNATURE')

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, intent_success_webhook_secret
            )
        
        except stripe.error.SignatureVerificationError as e:
            print('⚠️  Webhook signature verification failed.' + str(e))

        intent = event['data']['object']
        data = intent['metadata']
        print(data)
        
        if 'user' in data.keys():
            order_created = StripeWebhooks(intentId = intent['id'], data = data, 
                                           amount = intent['amount'], 
                                           user = data['user']).createOrder()
        else:
            order_created = StripeWebhooks(intentId = intent['id'], data = data, 
                                amount = intent['amount']).createOrder()
        if order_created:
            return response.Response(intent, status = 200)
        print("couldn't create")
        return response.Response(staus = 400)
