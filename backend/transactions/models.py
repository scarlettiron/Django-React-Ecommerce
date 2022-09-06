from django.db import models
from orders.models import Order


paymentMethods = [
    ('stripe', 'Stripe')
]


class Transaction(models.Model):
    paymentMethod = models.CharField(choices=paymentMethods, max_length = 100)
    amount = models.IntegerField()
    is_payment = models.BooleanField(default=True)
    is_payout = models.BooleanField(default=False)
    is_refund = models.BooleanField(default = False)
    paymentId = models.CharField(max_length = 1000)
    order = models.ForeignKey(Order, on_delete = models.SET_NULL, null = True)
    
    
