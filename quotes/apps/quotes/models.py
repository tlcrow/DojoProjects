# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import re
from django.db import models
from datetime import datetime
import bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
A_REGEX = re.compile(r'^[a-zA-Z ]+$')
D_REGEX = re.compile(r'^[0-9]{4}-[0-9]{2}-[0-9]{2}$')

class UserManager(models.Manager):
    def basic_validator(self, postData):
        error = {}
        print postData
        if len(postData['name']) < 2:
            error['n_a_m_e'] = "Name should be more than 2 characters"
        if not A_REGEX.match(postData['name']):
            error['name'] = "Name should only contain letters"
        if len(postData['alias']) < 2:
            error['alias'] = "Alias should be more than 2 characters"
        if not A_REGEX.match(postData['alias']):
            error['al_i_as'] = "Alias should only contain letters"
        if not EMAIL_REGEX.match(postData['email']):
            error['email'] = "Email must be valid"
        if User.objects.filter(email = postData['email']):
            error['already'] = "Email already registered, please login"
        if len(postData['password']) < 8:
            error['password'] = "Password must be more than 8 characters"
        if postData['password'] != postData['confirm_password']:
            error['cpassword'] = "Password and confirm password must match"
        if len(postData['dob']) < 1:
            error['dob'] = "Date of birth can not be blank"
        if postData['dob'] > str(datetime.now()):
            error['d_o_b'] = "Date of birth must be must be in YYYY-MM-DD format and in the past"
        print error
        return error
    
    def login_validator(self, postData):
        error = {}
        print postData
        if not User.objects.filter(email = postData['email']):
            error['login'] = "Incorrect Email"
            return error
        if not bcrypt.checkpw(postData['password'].encode('utf8'), User.objects.get(email=postData['email']).password.encode('utf8')):
            error['loginpassword'] = "Incorrect Password"
        return error

class QuoteManager(models.Manager):
    def quote_validator(self, postData):
        print postData
        error = {}
        if len(postData['author_name']) < 3:
            error['destination'] = "Author name must be more than 3 characters"
        if len(postData['message']) < 10:
            error['desc'] = "Message must be longer than 10 characters"
        return error

class User(models.Model):       
    name = models.CharField(max_length=255)
    alias = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    dob = models.DateField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)
    objects = UserManager()

class Quote(models.Model):
    author_name = models.CharField(max_length=255)
    message = models.TextField()
    created_by = models.ForeignKey(User)
    joined_users = models.ManyToManyField(User, related_name="joined_users")
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)
    objects = QuoteManager()

