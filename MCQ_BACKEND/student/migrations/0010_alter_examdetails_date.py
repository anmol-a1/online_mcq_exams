# Generated by Django 3.2.9 on 2021-12-17 17:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0009_examdetails_user_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='examdetails',
            name='date',
            field=models.DateField(default=datetime.date(2021, 12, 17)),
        ),
    ]