# Generated by Django 5.0.7 on 2024-09-08 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0017_buns_img_buns'),
    ]

    operations = [
        migrations.AlterField(
            model_name='buns',
            name='img_buns',
            field=models.ImageField(default=1, upload_to='buns'),
            preserve_default=False,
        ),
    ]