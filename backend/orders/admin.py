from django.contrib import admin
from .models import NoLoginAddress, Order, OrderItem

admin.site.register(NoLoginAddress)
admin.site.register(Order)
admin.site.register(OrderItem)
