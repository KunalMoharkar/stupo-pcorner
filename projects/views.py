from django.shortcuts import render
from rest_framework import viewsets
from .models import Application,Project
from .serializers import ApplicationSerializer,ProjectSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def auth(self,request):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        payload = jwt.decode(token,"mykey", algorithm="HSA26")
        username = payload['username']
        password = payload['password']

        if username=="kunal" and password=="22241":
            return True

        return False

    
    def update(self, request, pk):
        application = Application.objects.get(pk=pk)
        data = {'application_status_id':request.POST.get('application_status_id')}
        serializer = ApplicationSerializer(application, data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def create(self, request):

        if self.auth(request)==False:
            serializer = ApplicationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        raise Http404

    def get_queryset(self):
        
        retval = self.auth(self.request)

        if retval==True:
            queryset = Application.objects.all().order_by('-pk')
            project_id = self.request.query_params.get('project_id')
            student_id = self.request.query_params.get('student_id')
            status = self.request.query_params.get('status')

            if project_id is not None:
                queryset = queryset.filter(project__pk=project_id).order_by('-pk')

            if student_id is not None:
                queryset = queryset.filter(student__pk=student_id).order_by('-pk')

            if status is not None :
                if status == "all":
                    queryset = queryset.filter(project__pk=project_id).order_by('-pk')
                elif status == "selected" :
                    queryset = queryset.filter(application_status__pk=1).filter(project__pk=project_id).order_by('-pk')
                else :
                    queryset = queryset.filter(application_status__pk=2).filter(project__pk=project_id).order_by('-pk')

            return queryset
        else:
            raise Http404

class ProjectViewSet(viewsets.ModelViewSet):
    
    serializer_class = ProjectSerializer

    def auth(self,request):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        payload = jwt.decode(token,"mykey", algorithm="HSA26")
        username = payload['username']
        password = payload['password']

        if username=="kunal" and password=="22241":
            return True

        return False

    def update(self, request, pk):
        project = Project.objects.get(pk=pk)
        data = {'project_status_id':request.POST.get('project_status_id')}
        serializer = ProjectSerializer(project, data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def create(self, request):

        if self.auth(self.request)==False:
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        raise Http404

    def get_queryset(self):

        queryset = Project.objects.all().order_by('-pk')
        professor_id = self.request.query_params.get('professor_id')

        if professor_id is not None:
            queryset = queryset.filter(professor__pk=professor_id).order_by('-pk')

        return queryset