# Generated by Django 4.1 on 2022-09-06 02:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0005_orderitem_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paymentMethod', models.CharField(choices=[('stripe', 'Stripe')], max_length=100)),
                ('amount', models.IntegerField()),
                ('is_payment', models.BooleanField(default=True)),
                ('is_payout', models.BooleanField(default=False)),
                ('is_refund', models.BooleanField(default=False)),
                ('paymentId', models.CharField(max_length=1000)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.order')),
            ],
        ),
    ]