# Generated by Django 5.0.7 on 2024-09-07 13:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_payment_donator_social_media'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='donator_social_media',
        ),
    ]