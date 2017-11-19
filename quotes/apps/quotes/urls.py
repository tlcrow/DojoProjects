from django.conf.urls import url
from . import views 
urlpatterns = [
    url(r'^main$', views.index),
    url(r'^quotes$', views.quotes),
    url(r'^users/(?P<user_id>\d+)$', views.user),
    url(r'^add$', views.addquote),
    url(r'^login$', views.login),
    url(r'^registration$', views.registration),
    url(r'^logout$', views.logout),
    url(r'^mylist/(?P<user_id>\d+)$', views.mylist),
    url(r'^remove/(?P<user_id>\d+)$', views.remove)
]
