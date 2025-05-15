
from django.urls import path

from api import views as api_vivews

urlpatterns = [
     #token
     path('posts/', api_vivews.PostListAPIView.as_view()),

]
