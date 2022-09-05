from django.urls import path
from . import views as v
urlpatterns = [
    path('create-intent/', v.stripe_intent.as_view(), name='stripe-checkout-session'),
    path('stripe-webhook/', v.stripe_intent_webhook.as_view(), name="stripe-webhook"),
    
]