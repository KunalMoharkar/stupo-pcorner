from django.shortcuts import render
import jwt
from django.http import HttpResponse

def index(request):

    return render(request, 'index.html')

def dummyLogin(request):
    
    username = request.POST.get('username')
    password = request.POST.get('password')

    if username == "kunal" and password == "22241":
        
        payload = {
            'username': username,
            'password':password,
        }

        SECRET_KEY = "mykey"

        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        context={'token':token.decode('utf-8')}

        return render(request, 'dashboard.html', context)

        
    return HttpResponse("<h1>Error</h1>")
