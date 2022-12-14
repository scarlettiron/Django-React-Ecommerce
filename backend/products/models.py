from django.db import models
from categoriesTags.models import Category, SubCategory, ThirdSubcategory, Tag
from ckeditor.fields import RichTextField

class Product(models.Model):
    title = models.CharField(max_length=250)
    scientific_name = models.CharField(max_length=250)
    description = RichTextField(max_length=1000)
    care = RichTextField(max_length=1000)
    inventory = models.IntegerField(default=0)
    min_order = models.IntegerField(default = 1)
    discount = models.IntegerField(blank=True, null=True) 
    active = models.BooleanField(default=True)
    single_price = models.IntegerField()
    max_price = models.IntegerField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, blank=True, null=True)
    thirdsubcategory = models.ForeignKey(ThirdSubcategory, on_delete=models.CASCADE, blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='tagslist')
    
    def __str__(self):
        return f"{self.pk} | {self.title}" 
    
    
class FeaturedProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    slot = models.IntegerField()
    
    def __str__(self):
        return f"product: {self.product} | slot: {self.slot}"
    
    
    
class ProductPackage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    discount = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"pk: {self.pk} | product: {self.product} | price: {self.price}"
     
    
class StProduct(models.Model):
    product = models.OneToOneField(Product, blank=True, null=True, on_delete=models.CASCADE)
    package = models.OneToOneField(ProductPackage, blank=True, null=True, on_delete=models.CASCADE)
    st_price = models.CharField(max_length=300)
    st_product = models.CharField(max_length=300)
    

    
    
    
    