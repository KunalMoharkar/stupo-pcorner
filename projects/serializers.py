from rest_framework import serializers
from .models import Application,Project,Professor,Student,Projectstatus,Applicationstatus,Tech
from portal.serializers import UserSerializer,RoleSerializer


class ProfessorSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Professor
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Student
        fields =  '__all__'


class ProjectstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projectstatus
        fields = '__all__'

class ApplicationstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicationstatus
        fields = '__all__'

class TechSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tech
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):

    professor = ProfessorSerializer(read_only=True)
    project_status = ProjectstatusSerializer(read_only=True)
    tech_used = TechSerializer(read_only=True, many=True)
    tech_used_id = serializers.PrimaryKeyRelatedField(queryset = Tech.objects.all(), source='tech_used', write_only=True, many=True)
    professor_id = serializers.PrimaryKeyRelatedField(queryset = Professor.objects.all(), source='professor', write_only=True)
    project_status_id =  serializers.PrimaryKeyRelatedField(queryset = Projectstatus.objects.all(), source='project_status', write_only=True)

    class Meta:
        model = Project
        fields= '__all__'

class ApplicationSerializer(serializers.ModelSerializer):

    project = ProjectSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    application_status = ApplicationstatusSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(queryset = Project.objects.all(), source='project', write_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset = Student.objects.all(), source='student', write_only=True)
    application_status_id = serializers.PrimaryKeyRelatedField(queryset = Applicationstatus.objects.all(), source='application_status', write_only=True)

    class Meta:
        model = Application
        fields = '__all__'