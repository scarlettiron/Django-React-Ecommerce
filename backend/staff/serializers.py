from rest_framework import serializers
from .models import ContactRequest

class contactRequest_serializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'