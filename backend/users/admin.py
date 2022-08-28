from django.contrib import admin
from .models import CustomProfile, Balance, Address

admin.site.register(CustomProfile)
admin.site.register(Balance)
admin.site.register(Address)
