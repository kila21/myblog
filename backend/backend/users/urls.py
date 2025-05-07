from django.urls import path

from users import views as users_views

urlpatterns = [
     path('register/', users_views.RegisterView.as_view()),
     path('profile/<user_id>/', users_views.ProfileView.as_view()),
]
