
from django.urls import path

from api import views as api_views

urlpatterns = [
     ## posts
     path('posts/', api_views.PostListAPIView.as_view()),
     path('posts/create/', api_views.PostCreateAPIView.as_view()),
     path('posts/detail/<slug:slug>/', api_views.PostDetailAPIView.as_view()),
]
