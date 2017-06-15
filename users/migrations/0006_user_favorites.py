# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-05 07:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_auto_20170602_0009'),
        ('users', '0005_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorites',
            field=models.ManyToManyField(blank=True, to='books.Book'),
        ),
    ]
