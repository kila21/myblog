from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    bio = models.TextField(blank=True)
    about = models.TextField(blank=True)
    author = models.BooleanField(default=False)
    country = models.CharField(max_length=100, blank=True, null=True)
    twitter = models.CharField(max_length=150, blank=True, null=True)
    facebook = models.CharField(max_length=150, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    