from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.serializers.json import DjangoJSONEncoder

from . models import User, Beat


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
    






def profile(request, user_id):

    return render(request, 'beat/profile.html')





def example(request):



    return render(request, 'beat/example.html')

@csrf_exempt
@login_required
def savebeat(request):
    user = request.user

    if request.method == 'POST':
        data = json.loads(request.body)
        melody = data.get("melody")
        drums = data.get("drums")
        
        sequence = Beat(creator=user, melody=melody, drums=drums)
        sequence.save()

    return HttpResponse(status=204)

def index(request):
    
    beats = Beat.objects.all()

    melody_json = [json.dumps(beat.melody, cls=DjangoJSONEncoder) for beat in beats]


    return render(request, 'beat/index.html', {
        "melody_json": melody_json,

    })

def beat(request, id):
    
    beat = Beat.objects.get(pk=id)

    print(beat.melody)
    return render(request, 'beat/beat.html', {
        'response': beat.melody
    } )
    