from django.db import models

class ContactRequest(models.Model):
    body = models.CharField(max_length = 1000)
    date = models.DateTimeField(auto_now_add = True)
    email = models.EmailField()
    
