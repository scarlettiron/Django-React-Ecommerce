
from rest_framework.serializers import ModelSerializer

from media.serializers import media_serializer
from .models import Product, ProductPackage, FeaturedProduct, Category

class ProductPackage_Serializer(ModelSerializer):
    class Meta:
        model = ProductPackage
        fields = '__all__'


class ProductList_Serializer(ModelSerializer):
    packages = ProductPackage_Serializer(many=True, read_only=True)
    images = media_serializer(many=True)
    class Meta:
        model = Product
        fields = ['id', 'title', 'scientific_name', 'description', 'care', 'inventory', 'min_order', 'discount',
                  'active', 'single_price', 'max_price', 'category', 'subcategory', 'thirdsubcategory', 'packages',
                  'images']
        read_only = ['packages', 'images']



class PrefetchProduct_Serializer(ModelSerializer):
    images = media_serializer(many=True)
    class Meta:
        fields = '__all__'
        model = Product
        
        
       
class FeaturedProduct_Serializer(ModelSerializer):
    product = PrefetchProduct_Serializer()
    class Meta:
        model = FeaturedProduct
        fields = '__all__'
        
class Category_Serializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'