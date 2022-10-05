from django.urls import path
from . import views as v

urlpatterns = [
    path('product-list/', v.product_list.as_view(), name = 'all-products'),
    path('product-detail/<int:pk>/', v.product_detail.as_view(), name="product-detail"),
    path('featured-products/', v.featuredProductList.as_view(), name='featured-products'),
    path('products/bycategory/<str:category>', v.product_list_by_category.as_view(), name='products-by-category'),
    path('cart/', v.Cart.as_view(), name='cart'),
]