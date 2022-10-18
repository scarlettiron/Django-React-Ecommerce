from dataclasses import field
from rest_framework import serializers
from .models import Category, SubCategory, ThirdSubcategory

from products.serializers import FeaturedProduct_Serializer


class Subcategory_Serializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'
    

#this serializer is for the method which queries for all categories and corresponding subcategories
class AllCategories_Serializer(serializers.ModelSerializer):
    subcategories = Subcategory_Serializer(many=True, read_only=True)
    class Meta: 
        model = Category
        fields = ['id', 'title', 'subcategories', 'placeholder']

