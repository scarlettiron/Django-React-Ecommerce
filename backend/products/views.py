
from rest_framework import generics, response
from django.db.models import Prefetch, Q
from .serializers import ProductList_Serializer, FeaturedProduct_Serializer
from .models import Product, Category, SubCategory, ThirdSubcategory, FeaturedProduct

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
            qs = Product.objects.filter(pk=pk).prefetch_related(Prefetch('productpackage_set', to_attr = 'packages'))[0]
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
    