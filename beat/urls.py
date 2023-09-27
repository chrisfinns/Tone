from django.urls import path

from . import views # . means the current directory

urlpatterns = [
    path("", views.index, name="index"),
    path('login', views.login_view, name="login"),
    path('logout', views.logout_view, name="logout"),
    path('register', views.register, name="register"),
    path('example', views.example, name="example"),
    path('profile/<str:user_id>', views.profile, name="profile"), 
    

]