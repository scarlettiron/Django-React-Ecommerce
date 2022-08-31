import stripe
from decouple import Config

stripe.api_key=Config('STRIPE_SECRET_KEY')

class StripeCheckoutSession:
    def __init__(self, subtotal, checkout_session_id = None, user = None):
        self.subtotal = subtotal
        self.checkout_session_id = checkout_session_id
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
                
            }
        )
            
        except:
            return False
        
        self.checkout_session_id = checkout_session_id.url
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
            }
        )
        except:
            return False
            
        self.checkout_session_id = checkout_session_id.url
        return self
    
    
