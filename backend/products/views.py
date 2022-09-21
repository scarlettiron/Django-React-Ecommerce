
from multiprocessing.sharedctypes import Value
from rest_framework import generics, response
from django.db.models import Prefetch, Q, OuterRef, Subquery, ExpressionWrapper, IntegerField
from .serializers import ProductList_Serializer, FeaturedProduct_Serializer, Category_Serializer
from .models import Product, Category, ProductPackage, SubCategory, ThirdSubcategory, FeaturedProduct
from json import dumps
from media.models import Media

class product_list(generics.ListAPIView):
    model = Product
    serializer_class = ProductList_Serializer
    queryset = Product.objects.prefetch_related(Prefetch('productpackage_set', to_attr = 'packages'))


class product_detail(generics.RetrieveAPIView):
    model = Product
    serializer_class = ProductList_Serializer
    lookup_field = 'pk'
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        try:
            qs = Product.objects.filter(pk=pk).prefetch_related(Prefetch('productpackage_set', to_attr = 'packages'), Prefetch('media_set', to_attr = 'images'))[0]
        except:
            qs = Product.objects.none()
        return qs
    
    def get(self, request, *args, **kwargs):
        qs = self.get_queryset()
        if qs:
            serializer = self.serializer_class(qs)
            return response.Response(serializer.data, status = 200)
        return super().retrieve(self, request, *args, **kwargs)
        
        
class search_products(generics.ListAPIView):
    model = Product
    serializer_class = ProductList_Serializer
    
    def get_queryset(self):
        q = self.request.GET.get('q', None)
        
        try:
            qs = Product.objects.filter(Q(title__icontains = q) | Q(description__icontains = q) |
                                        Q(category__title__icontains = q) | Q(subcategory__title__icontains = q) | 
                                        Q(thirdsubcategory__title__icontains = q)).select_related('category', 
                                        'subcategory', 'thirdsubcategory').prefetch_related(Prefetch('productpackage_set', to_attr = 'packages'))
                                        
        except:
            qs = Product.objects.none()
        
        return qs
    


class featuredProductList(generics.ListAPIView):
    serializer_class = FeaturedProduct_Serializer
    model = FeaturedProduct
    queryset = FeaturedProduct.objects.all().select_related('product')
    
    
    
#for getting all info for home page, this view saves extra request
class HomePage(generics.GenericAPIView):
    serializer_class = FeaturedProduct_Serializer
    def get(self, request, *args, **kwargs):
     
        cats = Category.objects.all()
        categories = Category_Serializer(cats, many = True).data

        featuredProducts = FeaturedProduct.objects.all().select_related('product').prefetch_related(Prefetch('product__media_set', to_attr = 'images'))
        featured = FeaturedProduct_Serializer(featuredProducts, many=True).data

        return response.Response({'categories':categories, 'featuredproducts':featured}, status = 200)
            

class Cart(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        data = self.request.data
        
        print(data)
        
        products = []
        packageDict = {}
        
        for prod in data:
            products.append(prod['product'])
            for pack in prod['packages']:
                packageDict[pack['id']] = pack['qty']
                
        dictKeys = list(packageDict.keys())
        
        print(products)
        print(packageDict)
                
        cart = Product.objects.filter(pk__in = products).prefetch_related(Prefetch('productpackage_set',
                                                        queryset=ProductPackage.objects.filter(id__in = dictKeys), to_attr = 'packages'), 
        
                                                    Prefetch('media_set', to_attr = 'images'))
        
        print(cart[1].packages)

        ''' for item in cart:
            print(item) '''
    