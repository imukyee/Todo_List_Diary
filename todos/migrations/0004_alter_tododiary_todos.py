# Generated by Django 3.2.12 on 2022-03-18 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0003_tododiary_todos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tododiary',
            name='todos',
            field=models.JSONField(default={}),
        ),
    ]