from dataclasses import fields
from rest_framework import serializers
from .models import Media

class media_serializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'