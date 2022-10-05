from unicodedata import category
from rest_framework import generics
from .serializers import AllCategories_Serializer
from .models import Category

from django.db.models import Prefetch

from products.models import FeaturedProduct
from products.serializers import FeaturedProduct_Serializer

class all_categories(generics.ListAPIView):
    model = Category
    serializer_class = AllCategories_Serializer
    queryset = Category.objects.all().prefetch_related(Prefetch('subcategory_set', to_attr = 'subcategories'))

          
#view returns all data needed for home context on frontend 
class homePageInfo(generics.ListAPIView):
    model = Category
    serializer_class = AllCategories_Serializer
    queryset = Category.objects.all().prefetch_related(Prefetch('subcategory_set', to_attr = 'subcategories'))


    def list(self, request, *args, **kwargs):
        modified_response = super().list(request, *args, **kwargs)
        try:
            featured = FeaturedProduct.objects.all().select_related('product').prefetch_related(Prefetch('product__media_set', to_attr = 'images'))
            featuredProducts = FeaturedProduct_Serializer(featured, many=True).data 
        except:
            featuredProducts = []
        
        modified_response.data['featuredproducts'] = featuredProducts
        return modified_response