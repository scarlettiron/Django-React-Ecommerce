from rest_framework import generics
from django.db.models import Q, Prefetch
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from products.models import Product
from products.serializers import ProductList_Serializer



class search_complex(generics.ListAPIView):
    serializer_class = ProductList_Serializer
    model = Product
    
    def get_queryset(self):
        qData = self.request.GET.get("q")

        q_list = qData.split(" ")

        complex_query = SearchQuery(q_list[0])
        
        if len(q_list) > 1:
            for q in q_list[1:]:
                complex_query |= SearchQuery(q)

        vector = SearchVector('tags__body', weight="A") + SearchVector('title', weight="B") + SearchVector('category', 'subcategory', 'thirdsubcategory', weight="C")+ SearchVector('description', weight="d")
        search_rank = SearchRank(vector, complex_query)
        
        products = Product.objects.annotate(
            rank = search_rank).prefetch_related(Prefetch('media_set', to_attr = 'images')).filter(rank__gte = 0.03).distinct().order_by("-rank")
        
        print(products.count())
        return products





class search_basic(generics.ListAPIView):
    model = Product
    serializer_class = ProductList_Serializer
    
    def get_queryset(self):
        q = self.request.GET.get('q', None)
        
        try:
            qs = Product.objects.filter(Q(title__icontains = q) | Q(description__icontains = q) |
                                        Q(category__title__icontains = q) | Q(subcategory__title__icontains = q) | 
                                        Q(thirdsubcategory__title__icontains = q)).select_related('category', 
                                        'subcategory', 'thirdsubcategory').prefetch_related(
                                        Prefetch('productpackage_set', to_attr = 'packages'),
                                        Prefetch('media_set', to_attr = 'images'))
                                        
        except:
            qs = Product.objects.none()
        
        return qs
    
    
