# Generated by Django 5.0.7 on 2024-09-10 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0024_alter_donationprofile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='buns',
            name='color_treats',
            field=models.CharField(default=1, max_length=120),
            preserve_default=False,
        ),
    ]