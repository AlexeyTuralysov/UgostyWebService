# Generated by Django 5.0.7 on 2024-10-07 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0031_donationprofile_status_banned'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='type_payout',
            field=models.BooleanField(default=False),
        ),
    ]