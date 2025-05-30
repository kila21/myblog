from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics

from api import models as api_models
from api import serializers as api_serializers


# Post Serializers
class PostListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return api_models.Post.objects.all()
    

class PostCreateAPIView(generics.CreateAPIView):
    queryset = api_models.Post.objects.all()
    serializer_class = api_serializers.PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)
    
class PostDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        slug = self.kwargs['slug']
        return get_object_or_404(api_models.Post, slug=slug)

