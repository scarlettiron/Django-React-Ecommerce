from . import views as v
from django.urls import path

urlpatterns = [
    path('create-contact-request/', v.create_contact_request.as_view(), name='create-contact-request'),
    
]