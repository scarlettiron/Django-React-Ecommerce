from django.contrib import admin
from .models import Product, ProductPackage, StProduct, FeaturedProduct

admin.site.register(Product)
admin.site.register(ProductPackage)
admin.site.register(StProduct)
admin.site.register(FeaturedProduct)
