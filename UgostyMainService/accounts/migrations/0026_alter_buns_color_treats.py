# Generated by Django 5.0.7 on 2024-09-15 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0025_buns_color_treats'),
    ]

    operations = [
        migrations.AlterField(
            model_name='buns',
            name='color_treats',
            field=models.TextField(max_length=120),
        ),
    ]