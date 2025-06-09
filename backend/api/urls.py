
from django.urls import path

from api import views as api_views

urlpatterns = [
     ## posts
     path('posts/', api_views.PostListAPIView.as_view(), name='post-all'),
     path('posts/create/', api_views.PostCreateAPIView.as_view(), name='post-create'),
     path('posts/detail/<slug:slug>/', api_views.PostDetailAPIView.as_view(), name='post-detail'),
     path('posts/user-posts/<str:username>/', api_views.UserPostsListView.as_view(), name='user-posts'),
     path('posts/delete/<slug:slug>/', api_views.PostDeleteApiView.as_view(), name='post-delete'),


     ## comments
     path('comments/create/', api_views.CommentCreateAPIView.as_view(), name='create-comment'),
     path('comments/user-comments/', api_views.UserCommentsListView.as_view(), name='user-comments'),
     path('comments/post/<slug:slug>/', api_views.CommentsListAPIView.as_view(), name='post-comments'),

     ## category
     path('category/', api_views.CategoryListApiView.as_view(), name='category-all')
]
