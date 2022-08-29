from rest_framework import generics
from django.db.models import Prefetch
from .serializers import ProductList_Serializer
from .models import Product

class product_list(generics.ListAPIView):
    model = Product
    serializer_class = ProductList_Serializer
    queryset = Product.objects.prefetch_related(Prefetch('productpackage_set', to_attr = 'packages'))
