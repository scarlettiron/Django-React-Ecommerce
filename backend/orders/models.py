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
    
    def __str__(self):
        return f"{self.street} | {self.city} | {self.state} | {self.zip}"

orderStatuses = [
    ('processing', 'Processing'),
    ('paid', 'Paid'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered')
]

checkoutTypes = [
    ('stripe', 'Stripe')
]

shippingMethods = [
    ('usps', 'USPS'),
    ('ups', 'UPS'),
    ('fedex', 'FEDEX')
]

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    first_name = models.CharField(max_length = 100, blank=True, null=True)
    last_name = models.CharField(max_length = 100, blank=True, null=True)
    email = models.EmailField()
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null = True)
    tracking_number = models.CharField(max_length = 500, blank=True, null=True)
    shipping_method = models.CharField(choices=shippingMethods, blank=True, null=True, max_length=20)
    status = models.CharField(choices=orderStatuses, max_length = 50, default='processing')
    payment_type = models.CharField(choices=checkoutTypes, max_length=50)
    refunded = models.BooleanField(default = False)
    subTotal = models.IntegerField()
    tax = models.IntegerField()
    total = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    orderId = models.CharField(max_length=500, blank=True)
    
    def __str__(self):
        return f"user:{self.user} | orderId: {self.orderId}"
    
class OrderItem(models.Model):
    package = models.ForeignKey(ProductPackage, on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField()
    price = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.pk} | order {self.oder} | package {self.package}"
    