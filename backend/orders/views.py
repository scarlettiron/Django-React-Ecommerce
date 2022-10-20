from rest_framework.generics import RetrieveAPIView
from django.db.models import Prefetch
from .models import Order, OrderItem, Address
from .serializers import order_serializer


class get_order_info(RetrieveAPIView):
    model = Order
    serializer_class = order_serializer
    lookup_field='orderId'
    
    def get_queryset(self):
        order_id = self.kwargs['orderId']
        last_name = self.kwargs['last_name']
        zip = self.kwargs['zip']
        
        try:
            order_query = Order.objects.filter(orderId = order_id, last_name = last_name, address__zip = zip).select_related('address').prefetch_related(Prefetch('OrderItem_set', to_attr='order_items'))
            order = order_query[0]
        except:
             order = Order.objects.none()
             
        return order
        


