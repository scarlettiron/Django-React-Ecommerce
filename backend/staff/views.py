from rest_framework import generics
from .serializers import contactRequest_serializer
from .models import ContactRequest

class create_contact_request(generics.CreateAPIView):
    model = ContactRequest
    serializer_class = contactRequest_serializer
    queryset = ContactRequest.objects.all()
    