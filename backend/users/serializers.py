from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
    
## Register Serializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'}, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'username', 'full_name', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError('Passwords do not match!')
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            full_name=validated_data['full_name']
        )
        user.set_password(validated_data['password'])
        user.save()
    
        return user