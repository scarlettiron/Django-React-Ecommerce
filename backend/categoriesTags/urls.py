from django.urls import path
from . import views as v

urlpatterns = [
    path('all-categories/', v.all_categories.as_view(), name='all-categories'),
    path('home-info/', v.homePageInfo.as_view(), name='home-info'),
]