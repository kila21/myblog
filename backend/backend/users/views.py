from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny

from users import serializers as users_serializer
from users import models as users_models

# Create your views here.

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = users_serializer.ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs['user_id']
        profile = users_models.Profile.objects.get(user__id=user_id)
        return profile