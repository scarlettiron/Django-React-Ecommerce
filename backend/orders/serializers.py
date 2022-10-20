from dataclasses import fields
from rest_framework import serializers
from .models import Order, OrderItem, Address


class orderItems_serializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
 
class address_serializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'      
        
class order_serializer(serializers.ModelSerializer):
    order_items = orderItems_serializer(read_only = True)
    address = address_serializer()
    class Meta:
        model = Order
        fields = ['order_items', 'address', 'id', 'user', 'email', 'tracking_number', 
                  'shipping_address', 'shipping_method', 'status', 'payment_type', 'refunded', 'subtotal', 'tax',
                  'total', 'date', 'orderId', 'first_name', 'last_name']