from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics

from api import models as api_models
from api import serializers as api_serializers

# custom permision
from api.permissions import IsAuthorOrReadOnly


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
    # queryset = api_models.Post.objects.all()
    serializer_class = api_serializers.PostSerializer
    permission_classes = [IsAuthorOrReadOnly]
    # lookup_field = 'slug'

    def get_object(self):
        slug = self.kwargs['slug']
        obj = get_object_or_404(api_models.Post, slug=slug)
        self.check_object_permissions(self.request, obj)
        return obj

# authenticated user posts
class UserPostsListView(generics.ListAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return api_models.Post.objects.filter(author=self.request.user).order_by('-date')