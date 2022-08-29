from django.contrib import admin
from .models import Category, Tag,  SubCategory, ThirdSubcategory

admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(SubCategory)
admin.site.register(ThirdSubcategory)
