from django.db import models
from portal.models import PortalappPersoninformation

# Create your models here.
class Student(models.Model):
    user = models.OneToOneField('portal.PortalappPersoninformation', on_delete = models.CASCADE , primary_key = True)
    cgpa=models.CharField(max_length=10, default="0")

    def __str__(self):
        return self.user.firstname

class Professor(models.Model):
    user = models.OneToOneField('portal.PortalappPersoninformation' , on_delete = models.CASCADE , primary_key = True)
    def __str__(self):
        return self.user.firstname

class Applicationstatus(models.Model):
    name=models.CharField(max_length=1000)

    def __str__(self):
        return self.name

class Projectstatus(models.Model):
    name=models.CharField(max_length=1000)

    def __str__(self):
        return self.name

class Project(models.Model):

    title=models.CharField(max_length=200)
    description=models.CharField(max_length=1000)
    tech_used= models.CharField(max_length=1000)
    criterion=models.CharField(max_length=200, default="None")
    project_status = models.ForeignKey(Projectstatus, on_delete=models.PROTECT, null=True)
    professor=models.ForeignKey(Professor, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Application(models.Model):

    statement_of_purpose=models.CharField(max_length=1000)
    student = models.ForeignKey(Student, on_delete=models.CASCADE , default=None)
    project=models.ForeignKey(Project, on_delete=models.CASCADE)
    application_status = models.ForeignKey(Applicationstatus, on_delete=models.PROTECT, null=True)
    resume = models.FileField(upload_to="resume" , default="default.pdf")