import stripe
from decouple import config
from orders.models import Order, Address, OrderItem
from products.models import ProductPackage
from transactions.models import Transaction
from json import dumps, loads

stripe.api_key=config('STRIPE_SECRET_KEY')

class StripePaymentIntent:
    def __init__(self, subtotal, products, tax = "", shipping = "", first_name = "",
                 last_name = "", phone = "", email = "", intent = False, user = None):
        self.subtotal = subtotal
        self.tax = tax
        self.products = products
        self.intent = intent
        self.user = user
        self.shipping = shipping
        self.first_name = first_name
        self.last_name = last_name,
        self.phone = phone,
        self.email = email
        
        
    def NoLoginIntent(self):
        if not self.subtotal:
            raise Exception("order subtotal required")
        
        ### add tax and shipping to total ###
        # todo#
        total = self.subtotal + self.tax
        

        try:
            intent = stripe.PaymentIntent.create(
            amount = total,
            currency = 'USD',
            payment_method_types=["card"],

            metadata = {
                'site':config('SITE_NAME'),
                'user_logged_in':False,
                'products':dumps(self.products),
                'shipping':dumps(self.shipping),
                'first_name':str(self.first_name),
                'last_name':str(self.last_name),
                'phone':str(self.phone),
                'email':str(self.email),
                'subtotal':self.subtotal,
                'tax':self.tax
                },
            
            )
            
            
        except:
            self.intent = False
            return self 
        
        self.intent = intent
        return self
    
    
    
    def LoggedInIntent(self):
        if not self.subtotal:
            raise Exception("order subtotal required")
        if not self.user:
            raise Exception("user required")
        
        ### add tax and shipping to total ###
        total = self.subtotal + self.tax

        try:
            intent = stripe.PaymentIntent.create(
            amount = total,
            currency = 'USD',
            payment_method_types=["card"],

            metadata = {
                'site':config('SITE_NAME'),
                'user_logged_in':True,
                'user':self.user.username,
                'products':dumps(self.products),
                'shipping':dumps(self.shipping),
                'first_name':self.first_name,
                'last_name':self.last_name,
                'phone':self.phone,
                'email':self.email,
                'tax':self.tax
                },
            
            )
            
            
        except:
            self.intent = False
            return self 
            
        self.intent = intent
        return self
    
    
class StripeWebhooks:
    def __init__(self, intentId = "", data = None, amount = None, user = None, order = None):
        self.intentId = intentId
        self.data = data
        self.amount = amount
        self.user = user
        self.order = order
        
        
    def createOrder(self):
        if not self.data or not self.intentId:
            raise Exception("intent id and metadata required")
        if not self.amount:
            raise Exception("amount required")

        shipping = loads(self.data['shipping'])
        products = loads(self.data['products'])
        
        try:
            address = Address.objects.create(
                street = shipping['street'],
                city = shipping['city'],
                state = shipping['state'],
                zip = shipping['zip']
            )
        except:
            return False

        try:
            if self.user:
                order = Order.objects.create(
                    address = address,
                    paymentType = "stripe",
                    subTotal = self.data['subtotal'],
                    tax = self.data['tax'],
                    total = self.amount,
                    user = self.user
                )
            else:
                order = Order.objects.create(
                    address = address,
                    paymentType = "stripe",
                    subTotal = self.data['subtotal'],
                    tax = self.data['tax'],
                    total = self.amount
                )
                
        except:
            address.delete()
            return False

        try:
            packagePks = products.keys()
            packages = ProductPackage.objects.filter(pk__in = packagePks).select_related('product')
            
            orderInfo = products
            for p in packages:
                item = orderInfo[str(p.pk)]
                OrderItem.objects.create(package = p, qty = item['quantity'], price = p.price, order = order)
            
            self.order = order
            transaction = self.createTransaction()
            if transaction:
                return True
            return False
        except:
            address.delete()
            order.delete()    
            return False   
                
    
    
    def createTransaction(self):
        if not self.order:
            return False
    
        try:
            transaction = Transaction.objects.create(
                paymentMethod = "stripe",
                amount = self.amount,
                paymentId = self.intentId,
                order = self.order
            )
            return True
        
        except:
            self.order.delete()
            return False

