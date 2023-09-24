from django.urls import path

from . import views # . means the current directory

urlpatterns = [
    path("", views.index, name="index"),
    path('login', views.login, name="login") 
]