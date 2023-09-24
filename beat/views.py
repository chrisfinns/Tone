from django.shortcuts import render
from django.contrib.auth import authenticate, login


# Create your views here.
def login(request):
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

def index(request):
    return render(request, 'beat/index.html')
