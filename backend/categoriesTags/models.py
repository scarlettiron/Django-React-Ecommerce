from django.db.models import Model, CharField

class Category(Model):
    title = CharField(max_length=250)
    
    
    
class SubCategory(Model):
    title = CharField(max_length=250)
    

class ThirdSubcategory(Model):
    title = CharField(max_length=250)  


class Tag(Model):
    body = CharField(max_length=250)
    
    

    

