from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny

from users import serializers as users_serializers
from users import models as users_models

# Create your views here.

## returns profile of user. which also contains user object.
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = users_serializers.ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_username = self.kwargs['username']
        profile = users_models.Profile.objects.get(user__username=user_username)
        return profile
    
## Register View

class RegisterView(generics.CreateAPIView):
    queryset = users_models.User.objects.all()
    serializer_class = users_serializers.RegisterSerializer
    permission_classes = [AllowAny]