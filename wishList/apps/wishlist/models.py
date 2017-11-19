# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import re
from django.db import models
from datetime import datetime
import bcrypt

N_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+$')
D_REGEX = re.compile(r'^[0-9]{4}-[0-9]{2}-[0-9]{2}$')

class UserManager(models.Manager):
    def basic_validator(self, postData):
        error = {}
        print postData
        if len(postData['first_name']) < 4:
            error['f_name'] = "First name should be more than 3 characters"
        if len(postData['last_name']) < 4:
            error['l_name'] = "Last name should be more than 3 characters"
        if len(postData['username']) < 4:
            error['u_name'] = "Username should be more than 3 characters"
        if not N_REGEX.match(postData['username']):
            error['username'] = "User name can only contain letters, numbers, '+', '_', and '-'"
        if User.objects.filter(username = postData['username']):
            error['already'] = "Username already registered, please login"
        if len(postData['password']) < 8:
            error['password'] = "Password must be more than 8 characters"
        if postData['password'] != postData['confirm_password']:
            error['cpassword'] = "Password and confirm password must match"
        if len(postData['date_hired']) < 1:
            error['date'] = "Date of hire can not be blank"
        if postData['date_hired'] > str(datetime.now()):
            error['hired'] = "Date of hire must be must be in YYYY-MM-DD format and in the past"
        return error
    
    def login_validator(self, postData):
        error = {}
        print postData
        if not User.objects.filter(username = postData['username']):
            error['login'] = "Incorrect Username"
            return error
        if not bcrypt.checkpw(postData['password'].encode('utf8'), User.objects.get(username=postData['username']).password.encode('utf8')):
            error['loginpassword'] = "Incorrect Password"
        return error

class ItemManager(models.Manager):
    def item_validator(self, postData):
        print postData
        error = {}
        if len(postData['item_name']) < 4:
            error['item'] = "Item name must be more than 3 characters"
        return error

class User(models.Model):       
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    date_hired = models.DateField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)
    objects = UserManager()

class Item(models.Model):
    item_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User)
    joined_users = models.ManyToManyField(User, related_name="joined_users")
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)
    objects = ItemManager()