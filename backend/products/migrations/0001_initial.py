# Generated by Django 4.1 on 2022-08-28 03:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=1000)),
                ('care', models.CharField(max_length=1000)),
                ('inventory', models.IntegerField(default=0)),
                ('min_order', models.IntegerField(default=1)),
                ('discount', models.IntegerField(blank=True, null=True)),
                ('active', models.BooleanField(default=True)),
                ('single_price', models.IntegerField()),
                ('max_price', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductPackage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField()),
                ('price', models.IntegerField()),
                ('discount', models.IntegerField(blank=True, null=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
        migrations.CreateModel(
            name='StProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('st_price', models.CharField(max_length=300)),
                ('st_product', models.CharField(max_length=300)),
                ('package', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.productpackage')),
                ('product', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
    ]
