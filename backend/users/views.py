from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


from users import serializers as users_serializers
from users import models as users_models

# Create your views here.

# returns profile of user.
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = users_serializers.ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_username = self.kwargs['username']
        profile = users_models.Profile.objects.get(user__username=user_username)
        return profile
    
class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = users_serializers.UserProfileUpdateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user.profile
## Register View

class RegisterView(generics.CreateAPIView):
    queryset = users_models.User.objects.all()
    serializer_class = users_serializers.RegisterSerializer
    permission_classes = [AllowAny]

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = users_serializers.ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
