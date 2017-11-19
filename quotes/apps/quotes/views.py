# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, HttpResponse,	redirect
from datetime import datetime
from .models import User, UserManager, Quote, QuoteManager
from django.contrib import messages
import bcrypt

def index(request):
    if 'id' in request.session:
        return redirect('/quotes')
    else:
        return render(request, 'quotes/index.html')

def quotes(request):
    q = Quote.objects.all()
    q_set = set(q)
    # YOU MUST USE A GET!
    favorites = User.objects.get(id=request.session['id']).joined_users.all()
    q_set -= set(favorites)

    context = {
        'all': q_set,
        'favorites': favorites
    }
    return render(request, 'quotes/quotes.html', context)

def user(request, user_id):
    q = User.objects.get(id=user_id).joined_users.all()
    user = User.objects.get(id=user_id)
    context = {
        'favorites': q,
        'user':user
    }
    return render(request, 'quotes/users.html', context)

def addquote(request):
    errors = Quote.objects.quote_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/quotes')
    else:
        u = User.objects.get(id=request.session['id'])
        
        q = Quote.objects.create(author_name = request.POST['author_name'], message = request.POST['message'], created_by = u)


        # ds.save()
        return redirect ('/quotes')

def login(request):
    errors = User.objects.login_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/main')
    else:
        request.session['alias'] = User.objects.get(email=request.POST['email']).alias
        request.session['id'] = User.objects.get(email=request.POST['email']).id
        return redirect('/quotes')

def registration(request):
    errors = User.objects.basic_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/main')
    else:
        pwhash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())
        print pwhash
        User.objects.create(name = request.POST['name'], alias = request.POST['alias'], email = request.POST['email'], password = pwhash, dob = request.POST['dob'])
        request.session['alias'] = User.objects.get(email=request.POST['email']).alias
        request.session['id'] = User.objects.get(email=request.POST['email']).id
        return redirect ('/quotes')

def logout(request):
    for key in request.session.keys():
        del request.session[key]
    return redirect('/main')

def mylist(request, user_id):
    user = User.objects.get(id=request.session['id'])
    user.save()
    Quote.objects.get(id=user_id).joined_users.add(user)
    return redirect('/quotes')

def remove(request, user_id):
    quote_obj = Quote.objects.get(id = user_id)
    user = User.objects.get(id=request.session['id'])
    quote_obj.joined_users.remove(user)
    return redirect ('/quotes')
