from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework.views import Response, APIView, status

from api import models as api_models
from api import serializers as api_serializers
from users import models as users_models

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

# get user posts by user id
class UserPostsListView(generics.ListAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_username = self.kwargs['username']
        return api_models.Post.objects.filter(author__username=user_username).order_by('-date')
    
# get posts by category
class PostsFilterByCategory(generics.ListAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        slug = self.kwargs['slug']
        return api_models.Post.objects.filter(category__slug=slug)
    
class PostDeleteApiView(generics.DestroyAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def get_object(self):
        slug = self.kwargs['slug']
        obj = get_object_or_404(api_models.Post, slug=slug)
        self.check_object_permissions(self.request, obj)
        return obj
    
# Bookmark

### user bookmarked posts
class BookmarkedPostsView(generics.ListAPIView):
    serializer_class = api_serializers.PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        username = self.kwargs['username']
        user = users_models.User.objects.get(username=username)
        return user.bookmarked_posts.all()

class ToggleBookmarkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        user = request.user
        post = api_models.Post.objects.get(slug=slug)

        if user in post.bookmarked_by.all():
            post.bookmarked_by.remove(user)
            return Response({'bookmarked': 'Bookmark Removed Succesfully.'}, status=status.HTTP_200_OK)
        else:
            post.bookmarked_by.add(user)
            return Response({'bookmarked': 'Bookmark add Succesfully.'}, status=status.HTTP_200_OK)

# Comments
### get all comment of post
class CommentsListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        slug = self.kwargs['slug']
        post = get_object_or_404(api_models.Post, slug=slug)
        return post.comments.all().order_by('-created_at')

class CommentCreateAPIView(generics.CreateAPIView):
    serializer_class = api_serializers.CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print(serializer)
        return serializer.save(author=self.request.user)
    
### user comments
class UserCommentsListView(generics.ListAPIView):
    serializer_class = api_serializers.CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return api_models.Comment.objects.filter(author=self.request.user)
    

### category

class CategoryListApiView(generics.ListAPIView):
    serializer_class = api_serializers.CategorySerializer
    permission_classes = [AllowAny]
    queryset = api_models.Category.objects.all()

