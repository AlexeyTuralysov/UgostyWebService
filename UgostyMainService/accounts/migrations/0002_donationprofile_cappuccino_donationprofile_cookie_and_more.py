# Generated by Django 5.0.7 on 2024-08-03 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='donationprofile',
            name='cappuccino',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='donationprofile',
            name='cookie',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='donationprofile',
            name='gingerbread',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
