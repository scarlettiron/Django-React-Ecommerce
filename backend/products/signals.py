from math import prod
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Product, ProductPackage

@receiver(post_save, sender=ProductPackage)
def update_product_max_min_price(sender, instance, created, **kwargs):
    print(kwargs)
    product = instance.product
    if product.single_price > instance.price:
        product.single_price = instance.price
        product.save()
        return
    
    if product.max_price < instance.price:
        product.max_price = instance.price
        product.save()
        
@receiver(post_delete, sender=ProductPackage)
def update_product_max_min_price(sender, instance, **kwargs):
    print(kwargs)
    print(instance)
    product = instance.product
    if product.single_price == instance.price:
        lowest_package = ProductPackage.objects.filter(product = instance.product).exclude(pk=instance.pk).order_by('-price')[0]
        if(lowest_package):
            product.single_price = lowest_package.price
            product.save()
        return
    
    if product.max_price == instance.price:
        highest_package = ProductPackage.objects.filter(product = instance.product).exclude(pk=instance.pk).order_by('price')[0]
        product.max_price = highest_package.price
        product.save()
        return