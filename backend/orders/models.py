from django.db import models
from users.models import Address
from django.conf import settings
User = settings.AUTH_USER_MODEL

from products.models import Product

class NoLoginAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
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

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    noLoginAddress = models.ForeignKey(NoLoginAddress, on_delete=models.SET_NULL, blank=True, null=True)
    loginAdress = models.ForeignKey(Address, on_delete=models.SET_NULL, blank=True, null=True)
    trackingNumber = models.CharField(max_length = 500)
    status = models.CharField(choices=orderStatuses, max_length = 50)
    refunded = models.BooleanField(default = False)
    subTotal = models.IntegerField()
    tax = models.IntegerField()
    total = models.IntegerField()
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField()
    price = models.IntegerField()
    