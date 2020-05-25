from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializer import UserSerializer

# Allows Django Administrators to view API list
# 127.0.0.1:8000/api/users/
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer