from django.urls import path
from . import views as v

urlpatterns = [
    path('product-list/', v.product_list.as_view(), name = 'all-products'),
]