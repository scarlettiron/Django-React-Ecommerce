from django.db import models
from users.models import Address
from django.conf import settings
User = settings.AUTH_USER_MODEL

from products.models import ProductPackage

class Address(models.Model):
    street = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    zip = models.IntegerField()

orderStatuses = [
    ('processing', 'Processing'),
    ('paid', 'Paid'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered')
]

checkoutTypes = [
    ('stripe', 'Stripe')
]

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    email = models.EmailField()
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null = True)
    trackingNumber = models.CharField(max_length = 500, blank=True, null=True)
    status = models.CharField(choices=orderStatuses, max_length = 50, default='processing')
    paymentType = models.CharField(choices=checkoutTypes, max_length=50)
    refunded = models.BooleanField(default = False)
    subTotal = models.IntegerField()
    tax = models.IntegerField()
    total = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    orderId = models.CharField(max_length=500, blank=True)
    
class OrderItem(models.Model):
    package = models.ForeignKey(ProductPackage, on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField()
    price = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    