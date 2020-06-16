from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from .serializer import UserProfileSerializer
from .models import UserProfile
from .permissions import UpdateOwnProfile
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken


# Allows Django Administrators to view API list
# 127.0.0.1:8000/api/users/
class UserProfileViewSet(viewsets.ModelViewSet):
	serializer_class = UserProfileSerializer
	# queryset tells ViewSet what objects to retrieve from our database (ie retrieve all UserProfile objects)
	queryset = UserProfile.objects.all()
	# Since users have been created already here, we can send a POST request for a token when user logs in
	authentication_classes = (TokenAuthentication,)
	# Only allow logged in users to send a PUT/PATCH to change their profile data
	permission_classes = (UpdateOwnProfile,)
	# Allow users to search/filter other users by their names or email
	filter_backends = (filters.SearchFilter,)
	search_fields = ('name', 'email')


# Creates and returns an authentication token after login to Frontend
# 127.0.0.1:8000/api/auth/
class LoginViewSet(viewsets.ViewSet):
	serializer_class = AuthTokenSerializer

	def create(self, request):
		return ObtainAuthToken().post(request)
