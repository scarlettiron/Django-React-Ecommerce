from tkinter import CASCADE
from django.db.models import Model, CharField, ForeignKey, BooleanField, CASCADE

class Category(Model):
    title = CharField(max_length=250)
    hasSubcategory = BooleanField(default=False)
    
    
    
class SubCategory(Model):
    title = CharField(max_length=250)
    category = ForeignKey(Category, blank=True, null=True,  on_delete = CASCADE)
    

class ThirdSubcategory(Model):
    title = CharField(max_length=250)  


class Tag(Model):
    body = CharField(max_length=250)
    
    

    

