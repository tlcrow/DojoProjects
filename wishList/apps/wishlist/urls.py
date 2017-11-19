from django.conf.urls import url
from . import views 
urlpatterns = [
    url(r'^main$', views.index),
    url(r'^dashboard$', views.dashboard),
    url(r'^wish_items/(?P<item_id>\d+)$', views.wish_item),
    url(r'^create$', views.create),
    url(r'^wish_items/create$', views.wishcreate),
    url(r'^login$', views.login),
    url(r'^registration$', views.registration),
    url(r'^logout$', views.logout),
    url(r'^mylist/(?P<item_id>\d+)$', views.mylist),
    url(r'^remove/(?P<item_id>\d+)$', views.remove),
    url(r'^delete/(?P<item_id>\d+)$', views.delete)
]