# Generated by Django 4.1.1 on 2022-09-17 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_rename_rank_featuredproduct_slot'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='scientific_name',
            field=models.CharField(default=1, max_length=250),
            preserve_default=False,
        ),
    ]
