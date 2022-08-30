from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from .models import Product, ProductPackage

class ProductPackage_Serializer(ModelSerializer):
    class Meta:
        model = ProductPackage
        fields = '__all__'


class ProductList_Serializer(ModelSerializer):
    packages = ProductPackage_Serializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'care', 'inventory', 'min_order', 'discount',
                  'active', 'max_price', 'category', 'subcategory', 'thirdsubcategory', 'packages']
        read_only = ['packages']