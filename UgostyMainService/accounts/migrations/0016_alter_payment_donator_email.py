# Generated by Django 5.0.7 on 2024-09-07 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0015_remove_payment_donator_social_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='donator_email',
            field=models.CharField(max_length=50),
        ),
    ]
