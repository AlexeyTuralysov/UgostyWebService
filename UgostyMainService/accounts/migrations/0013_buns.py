# Generated by Django 5.0.7 on 2024-09-03 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_payment_donator_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Buns',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('price', models.IntegerField(default=0)),
                ('created_at', models.TextField(max_length=50)),
            ],
        ),
    ]
