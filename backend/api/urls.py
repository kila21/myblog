
from django.urls import path

from api import views as api_views

urlpatterns = [
     ## posts
     path('posts/', api_views.PostListAPIView.as_view()),
     path('posts/create/', api_views.PostCreateAPIView.as_view()),
     path('posts/detail/<slug:slug>/', api_views.PostDetailAPIView.as_view()),
     path('posts/user-posts/', api_views.UserPostsListView.as_view(), name='user-posts'),
     path('posts/delete/<slug:slug>/', api_views.PostDeleteApiView.as_view(), name='post-delete'),

     ## comments
     path('comments/<slug:slug>/', api_views.CommentsListAPIView.as_view(), name='post-comments')
]
