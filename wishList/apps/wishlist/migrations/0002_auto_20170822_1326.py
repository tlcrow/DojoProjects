# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-22 13:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wishlist', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Quote',
            new_name='Item',
        ),
    ]