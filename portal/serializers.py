from rest_framework import serializers
from .models import PortalappPersoninformation,PortalappRoles


class RoleSerializer(serializers.ModelSerializer):
     class Meta:
        model = PortalappRoles
        fields = '__all__'
    

class UserSerializer(serializers.ModelSerializer):

    roleid = RoleSerializer()
    class Meta:
        model = PortalappPersoninformation
        fields = '__all__'
    
