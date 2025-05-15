from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework import generics

from api import models as api_models
from api import serializers as api_serializers

# Create your views here.

class PostListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return api_models.Post.objects.all()