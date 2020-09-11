from django.db import models

class PortalappPersoninformation(models.Model):
    email = models.CharField(max_length=100)
    firstname = models.TextField(blank=True, null=True)
    lastname = models.TextField(blank=True, null=True)
    telephone1 = models.CharField(max_length=15, blank=True, null=True)
    telephone2 = models.CharField(max_length=15, blank=True, null=True)
    clg_id = models.IntegerField(primary_key=True)
    deptid = models.IntegerField()
    roll_no = models.TextField(blank=True, null=True)
    createdondate = models.DateField()
    is_active = models.IntegerField()
    roleid = models.ForeignKey('PortalappRoles', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'portalapp_personinformation'


class PortalappRoles(models.Model):
    role_id = models.AutoField(primary_key=True)
    short_name = models.TextField(blank=True, null=True)
    long_name = models.TextField(blank=True, null=True)
    display_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'portalapp_roles'

class PortalappForlogin(models.Model):
    password = models.CharField(max_length=500, blank=True, null=True)
    clg_id = models.ForeignKey('PortalappPersoninformation', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'portalapp_forlogin'