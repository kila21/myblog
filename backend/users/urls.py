from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from users import views as users_views

urlpatterns = [
     #token
     path('token/', TokenObtainPairView.as_view()),
     path('token/refresh', TokenRefreshView.as_view()),

     # users
     path('register/', users_views.RegisterView.as_view()),
     path('profile/<username>/', users_views.ProfileView.as_view()),
]
