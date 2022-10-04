from rest_framework import generics
from .serializers import AllCategories_Serializer
from .models import Category

from django.db.models import Prefetch

class all_categories(generics.ListAPIView):
    model = Category
    serializer_class = AllCategories_Serializer
    queryset = Category.objects.all().prefetch_related(Prefetch('subcategory_set', to_attr = 'subcategories'))
