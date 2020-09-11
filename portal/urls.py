from django.urls import path,include
from . import views

urlpatterns = [
    path("",views.index, name='index'),
    path("dummyLogin",views.dummyLogin, name='dummyLogin')
]