from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order
from django.core.mail import send_mail
from django.conf import settings
ServerEmail = settings.DEFAULT_FROM_EMAIL

@receiver(post_save, sender=Order)
def sendEmailUpdates(sender, instance, created,  **kwargs):
    if instance.status == 'processing':
        send_mail(
            subject = 'Your Order',
            message = 'Your order is being processed',
            from_email = ServerEmail,
            recipient_list = [instance.email],
            fail_silently = False
        )
    if instance.status == 'shipped':
        send_mail(
            subject = 'Your Order',
            message = 'Your order has shipped',
            recipient_list = [instance.email],
            fail_silently = False
        )
    if instance.status == 'delivered':
        send_mail(
            subject = 'Your Order',
            message = 'Your order has been delivered',
            recipient_list = [instance.email],
            fail_silently = False
        )