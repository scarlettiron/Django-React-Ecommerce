# Generated by Django 4.1.1 on 2022-09-23 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_product_scientific_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='productpackage',
            name='description',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
