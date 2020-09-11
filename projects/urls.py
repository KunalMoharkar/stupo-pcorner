from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'applications', views.ApplicationViewSet,basename="applications")
router.register(r'projects', views.ProjectViewSet,basename="projects")


urlpatterns=[

    path('api/',include(router.urls)),
]
