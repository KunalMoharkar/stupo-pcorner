from django.contrib import admin
from .models import Professor,Student,Project,Application,Applicationstatus,Projectstatus,Tech


admin.site.register(Professor)
admin.site.register(Student)
admin.site.register(Project)
admin.site.register(Application)
admin.site.register(Applicationstatus)
admin.site.register(Projectstatus)
admin.site.register(Tech)
# Register your models here.
