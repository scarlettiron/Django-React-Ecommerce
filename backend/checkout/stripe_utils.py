import stripe
from decouple import Config

stripe.api_key=Config('STRIPE_SECRET_KEY')

class StripeCheckoutSession:
    def __init__(self, subtotal, products, checkout_session = None, user = None):
        self.subtotal = subtotal
        self.products = products
        self.checkout_session = checkout_session
        self.user = user
        
    def NoLoginCheckoutSession(self):
        if not self.subtotal:
            raise Exception("order subtotal required")
        
        ### add tax and shipping to total ###
        # todo#
        total = self.subtotal

        try:
            checkout_session_id = stripe.checkout.Session.create(
            mode = 'payment',
            line_items = [
                {
                    'price_data':{
                        'unit_amount':total
                    }
                }
            ],
            metadata = {
                'site':Config('SITE_NAME'),
                'user_logged_in':False,
                'products':self.products,
                
            }
        )
            
        except:
            return False
        
        self.checkout_session = checkout_session_id
        return self
    
    def LoggedInCheckoutSession(self):
        if not self.subtotal:
            raise Exception("order subtotal required")
        if not self.user:
            raise Exception("user required")
        
        ### add tax and shipping to total ###
        # todo#
        total = self.subtotal

        try:
            checkout_session_id = stripe.checkout.Session.create(
            mode = 'payment',
            line_items = [
                {
                    'price_data':{
                        'unit_amount':total
                    }
                }
            ],
            metadata = {
                'site':Config('SITE_NAME'),
                'user_logged_in':True,
                'username':self.user.username,
                'products':self.products,
            }
        )
        except:
            return False
            
        self.checkout_session = checkout_session_id
        return self
    
    