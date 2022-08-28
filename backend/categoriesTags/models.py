from django.db.models import Manager, Model, QuerySet, CharField, ForeignKey, CASCADE
from products.models import Product

class Category(Model):
    title = CharField(max_length=250)
    
    
class Categories(Model):
    category = ForeignKey(Category, on_delete=CASCADE)
    product = ForeignKey(Product, on_delete=CASCADE)
    
    
class SubCategory(Model):
    title = CharField(max_length=250)
    
class SubCategories(Model):
    subCategory = ForeignKey(SubCategory, on_delete=CASCADE)
    product = ForeignKey(Product, on_delete=CASCADE)
    



class tagQueryset(QuerySet):
    def findProductsWithMostTags(self, query):
        pass
    
        

class tagManager(Manager):
    pass


   
class tag(Model):
    t = CharField(max_length=250)
    
    
class tags(Model):
    tag = ForeignKey(tag, on_delete=CASCADE)
    product = ForeignKey(Product, on_delete=CASCADE)
    
    searchProducts = tagManager()
    

