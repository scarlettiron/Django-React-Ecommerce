from django.urls import path
from . import views as v


urlpatterns = [
    path('order-info/<str:orderId>/<str:last_name>/<int:zip>/', v.get_order_info.as_view(), name='order-info'),
]
