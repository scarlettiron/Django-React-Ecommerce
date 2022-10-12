
from pickle import FALSE
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from media.serializers import media_serializer
from .models import Product, ProductPackage, FeaturedProduct, Category

class ProductPackage_Serializer(ModelSerializer):
    ordering_quantity = SerializerMethodField(read_only=True)
    out_of_stock = SerializerMethodField(read_only=True)
    class Meta:
        model = ProductPackage
        fields = ['id', 'ordering_quantity', 'product', 'qty', 'price', 
                  'discount', 'description', 'out_of_stock']

    def get_ordering_quantity(self, obj):
        try:
            cart = self.context['cart']
        except:
            return 0
        
        for item in cart:
            if item['product'] == obj.product.pk:
                for package in item['packages']:
                    if package['package'] == obj.id:
                        return package['ordering_quantity']
        return 0
    
    def get_out_of_stock(self, obj):
        #if view is for viewing cart
        try:
            cart = self.context['cart']
            print('cart')
            for item in cart:
                if item['product'] == obj.product.pk:
                    for package in item['packages']:
                        if package['package'] == obj.id:
                            totalQuantity = package['ordering_quantity'] * obj.qty
                            if totalQuantity > obj.product.inventory:
                                return True
                            return False
        
        #if view is for viewing product packages
        except:
            try:
                if obj.qty > obj.product.inventory:
                    return True
                return False
            except:
                return True
            

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
        
        
class Cart_Serializer(ModelSerializer):
    packages = ProductPackage_Serializer(many=True, read_only = True)
    images = media_serializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'scientific_name', 'description', 'care', 'inventory', 'min_order', 'discount',
                  'active', 'single_price', 'max_price', 'category', 'subcategory', 'thirdsubcategory', 'packages',
                  'images']
        read_only = ['packages', 'images']
        
                        
