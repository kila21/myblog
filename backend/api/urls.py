
from django.urls import path

from api import views as api_vivews

urlpatterns = [
     #token
     path('posts/', api_vivews.PostListAPIView.as_view()),
     path('posts/create/', api_vivews.PostCreateApiView.as_view())

]
