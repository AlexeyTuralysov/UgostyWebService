# Generated by Django 5.0.7 on 2024-09-26 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0030_remove_donationprofile_status_banned'),
    ]

    operations = [
        migrations.AddField(
            model_name='donationprofile',
            name='status_banned',
            field=models.BooleanField(default=False),
        ),
    ]