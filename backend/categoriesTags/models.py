from turtle import title
from django.db.models import Model, CharField, ForeignKey, BooleanField, CASCADE, ImageField

class Category(Model):
    title = CharField(max_length=250)
    hasSubcategory = BooleanField(default=False)
    
    def __str__(self):
        return f"{self.title}"
    
    
    
class SubCategory(Model):
    title = CharField(max_length=250)
    category = ForeignKey(Category, blank=True, null=True,  on_delete = CASCADE)
    placeholder = ImageField(upload_to='placeholders/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.title}"   

class ThirdSubcategory(Model):
    title = CharField(max_length=250)  


class Tag(Model):
    body = CharField(max_length=250)
    
    def __str__(self):
        return f"{self.body}"     

    

