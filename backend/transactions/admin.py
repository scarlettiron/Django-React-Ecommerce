from django.contrib import admin
from .models import Transaction, SiteBalance

admin.site.register(Transaction)
admin.site.register(SiteBalance)
