from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction, SiteBalance
from django.core.mail import send_mail
from django.conf import settings
ServerEmail = settings.DEFAULT_FROM_EMAIL

@receiver(post_save, sender = Transaction)
def sendRefundConfirmation(sender, instance, created, **kwargs):
    try:
        send_mail('Order Refund', 
                '''A Refund for your order has been issued, refunds can take 
                up to ten days to show up on your account.''',
                recipient_list=[instance.order.email],
                fail_silently=False
                )
    except:
        pass

@receiver(post_save, sender = Transaction)
def updateSiteTotal(sender, instance, created, **kwargs):
    try:
        bal = SiteBalance.objects.get()
        if created and instance.is_payment:
            bal.balance = bal.balance + instance.price
            bal.save()
            return
        if created and instance.is_payout:
            bal.balance = bal.balance - instance.price
            bal.save()
            return
        if created and instance.is_refund:
            bal.balance = bal.balance - instance.price
            bal.save()
            return
    except:pass
    

