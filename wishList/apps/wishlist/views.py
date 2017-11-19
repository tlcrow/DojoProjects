# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, HttpResponse,	redirect
from datetime import datetime
from .models import User, UserManager, Item, ItemManager
from django.contrib import messages
import bcrypt

def index(request):
    if 'id' in request.session:
        return redirect('/quotes')
    else:
        return render(request, 'wishlist/index.html')

def dashboard(request):
    i = User.objects.get(id=request.session['id']).joined_users.exclude(created_by=request.session['id'])
    a = Item.objects.exclude(joined_users=request.session['id'])
    c = Item.objects.filter(created_by=request.session['id'])
    context = {
        'all':a,
        'joined':i,
        'created':c,

    }
    return render(request, 'wishlist/dashboard.html', context)

def wish_item(request, item_id):
    i = Item.objects.get(id=item_id)
    j = Item.objects.get(id=item_id).joined_users.all()
    context = {
        'item_info':i,
        'joined_info':j,
    }
    return render(request, 'wishlist/show.html', context)

def create(request):
    errors = Item.objects.item_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/wish_items/create')
    else:
        u = User.objects.get(id=request.session['id'])
        i = Item.objects.create(item_name = request.POST['item_name'], created_by = u)

        i.joined_users.add(u)
        i.save()
       
        return redirect ('/dashboard')

def wishcreate(request):
    return render(request, 'wishlist/add.html')

def login(request):
    errors = User.objects.login_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/main')
    else:
        request.session['first_name'] = User.objects.get(username=request.POST['username']).first_name
        request.session['id'] = User.objects.get(username=request.POST['username']).id
        return redirect('/dashboard')

def registration(request):
    errors = User.objects.basic_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/main')
    else:
        pwhash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())
        print pwhash
        User.objects.create(first_name = request.POST['first_name'], last_name = request.POST['last_name'], username = request.POST['username'], password = pwhash, date_hired = request.POST['date_hired'])
        request.session['first_name'] = User.objects.get(username=request.POST['username']).first_name
        request.session['id'] = User.objects.get(username=request.POST['username']).id
        return redirect ('/dashboard')

def logout(request):
    for key in request.session.keys():
        del request.session[key]
    return redirect('/main')

def mylist(request, item_id):
    user = User.objects.get(id=request.session['id'])
    user.save()
    Item.objects.get(id=item_id).joined_users.add(user)
    return redirect('/dashboard')

def remove(request, item_id):
    item = Item.objects.get(id = item_id)
    user = User.objects.get(id=request.session['id'])
    item.joined_users.remove(user)
    return redirect ('/dashboard')

def delete(request, item_id):
    i = Item.objects.get(id=item_id)
    i.delete()
    return redirect ('/dashboard')


