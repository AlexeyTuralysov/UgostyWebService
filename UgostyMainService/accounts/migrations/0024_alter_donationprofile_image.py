# Generated by Django 5.0.7 on 2024-09-10 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0023_alter_buns_created_at_alter_payment_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donationprofile',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='buns/'),
        ),
    ]
