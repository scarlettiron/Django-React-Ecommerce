from this import d
from turtle import update
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction, SiteBalance

@receiver(post_save, sender = Transaction)
def sendRefundConfirmation(sender, instance, created, **kwargs):
    pass

@receiver(post_save, sender = Transaction)
def updateSiteTotal(sender, instance, created, **kwargs):
    if created:
        bal = SiteBalance.objects.get()
        bal.balance = bal.balance + instance.price
        bal.save()
        return
    

@receiver(post_save, sender = Transaction)
def sendOrderConfirmation(sender, instance, created, **kwargs):
    pass


@receiver(post_save, sender = Transaction)
def sendOrderConfirmation(sender, instance, created, **kwargs):
    pass