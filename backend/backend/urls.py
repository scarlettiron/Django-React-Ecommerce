
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    #path("stripe/", include("djstripe.urls", namespace="djstripe")),
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/checkout/', include("checkout.urls")),
    path('api/search/', include('search.urls')),
    path('api/categories/', include('categoriesTags.urls')),
    path('api/staff/', include('staff.urls')),
]
