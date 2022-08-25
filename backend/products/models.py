from django.db import models

class product(models.Model):
    description = models.CharField(max_length=1000)
