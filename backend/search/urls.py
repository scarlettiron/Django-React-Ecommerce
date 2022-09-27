from django.urls import path
from .import views as v

urlpatterns = [
    path('basic', v.search_by_description.as_view(), name='search-basic'),
    path('by-tags/<str:q>', v.search_by_tags.as_view(), name='search-by-tag'),
]