from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.urls import reverse


from . models import User


# Create your views here.
def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            return render(request, "beat/index.html")
        else: 
            return render(request, "beat/login.html", {
                "message": "Invalid username and/or password."
            })
    return render(request, 'beat/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):


    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "beat/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "beat/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "beat/register.html")
    






def index(request):
    return render(request, 'beat/index.html')


def profile(request, user_id):

    return render(request, 'beat/profile.html')





def example(request):

    

    return render(request, 'beat/example.html')