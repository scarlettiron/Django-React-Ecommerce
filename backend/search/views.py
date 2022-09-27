from rest_framework import generics, response
from django.db.models import Q, Prefetch, Count, Value, ValueRange
from django.contrib.postgres.search import SearchVector
from products.models import Product
from products.serializers import ProductList_Serializer
from categoriesTags.models import Tag


class search_by_description(generics.ListAPIView):
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
    
    
class search_by_tags(generics.ListAPIView):
    serializer_class = ProductList_Serializer
    model = Product
    
    def get_queryset(self):
        q = self.kwargs['q']
        print(q)
        

        ''' productsAndTags = Product.objects.all().prefetch_related(
            Prefetch('tag_set',to_attr='tags')) '''
        #products = Product.objects.filter(Q(tag_set_body__icontains = q))
        
        #products = Product.objects.filter(Q(tags__body__icontains = 'hiss'))
        
        #products = Product.objects.annotate(
        #    search = SearchVector('tags__body')).filter(search = ['hiss', 'crickey'])
        
        #products = Product.objects.all().prefetch_related(Prefetch('tags', queryset=Count('tags_body__in' = [q])))
        
        
        #products = Product.objects.filter(Q(tags__id__in = Tag.objects.filter(body__icontains = 'hiss')))
        
        #print(products)
