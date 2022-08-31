from rest_framework import generics, response
from .stripe_utils import StripeCheckoutSession as stSess


# for checking out with stripe if user is knot logged in

class stripe_checkout_session(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        subtotal = self.request.data.get('subtotal', None)
        products = self.request.data.getList('products', None)
        if not products or not subtotal:
            return response.Response('subtotal and list of products required', status = 400)
        
        if self.request.user.is_authenticated:
            instance = stSess(subtotal, products, user = request.user)
            session = instance.LoggedInCheckoutSession().checkout_session
        else:
            instance = stSess(subtotal, products)
            session = instance.NoLoginCheckoutSession().checkout_session
            
        if not session.url:
            return response.Response("error trying to create session, try again later", status = 400)
        
        return response.Response({'url':session.url, 'session_id':session.id})
            
        