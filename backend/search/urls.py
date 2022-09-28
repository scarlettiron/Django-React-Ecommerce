from django.urls import path
from .import views as v

urlpatterns = [
    path('basic/', v.search_basic.as_view(), name='search-basic'),
    path('complex/', v.search_complex.as_view(), name='search-by-tag'),
]