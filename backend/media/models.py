from itertools import product
from pyexpat import model
from django.db import models
from products.models import Product

    
class Media(models.Model):
    file = models.FileField(upload_to='products/media/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="media")
