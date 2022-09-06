from django.urls import path
from . import views as v

urlpatterns = [
    path('product-list/', v.product_list.as_view(), name = 'all-products'),
    path('product-detail/<int:pk>/', v.product_detail.as_view(), name="product-detail"),
    path('product-search/', v.search_products.as_view(), name="product-search"),
]