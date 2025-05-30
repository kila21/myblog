
from django.urls import path

from api import views as api_views

urlpatterns = [
     #token
     path('posts/', api_views.PostListAPIView.as_view()),
     path('posts-create/', api_views.PostCreateAPIView.as_view()),
     path('posts/<slug:slug>/', api_views.PostDetailAPIView.as_view())

]
