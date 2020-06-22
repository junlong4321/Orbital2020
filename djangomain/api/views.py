from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from .serializer import UserProfileSerializer, StockAnalysisSerializer, StockCounterSerializer
from .models import UserProfile, StockAnalysis, StockCounter
from .permissions import UserPermissions, IsSuperUser, IsUser, StockAnalysisPermissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken


# View API User list
# 127.0.0.1:8000/api/users/
class UserProfileViewSet(viewsets.ModelViewSet):
	serializer_class = UserProfileSerializer
	# queryset tells ViewSet what objects to retrieve from our database (ie retrieve all UserProfile objects)
	queryset = UserProfile.objects.all()
	# Since users have been created already here, we can send a POST request for a token when user logs in
	authentication_classes = (TokenAuthentication,)
	# Only allow logged in users to send a PUT/PATCH to change their profile data
	permission_classes = (UserPermissions,)
	# Allow users to search/filter other users by their names or email
	filter_backends = (filters.SearchFilter,)
	search_fields = ('name', 'email')


# Creates and returns an authentication token after login to Frontend
# 127.0.0.1:8000/api/auth/
class LoginViewSet(viewsets.ViewSet):
	serializer_class = AuthTokenSerializer

	def create(self, request):
		return ObtainAuthToken().post(request)


# Shows list of stocks available
class StockCounterViewSet(viewsets.ModelViewSet):
	serializer_class = StockCounterSerializer
	queryset = StockCounter.objects.all()
	authentication_classes = (TokenAuthentication,)
	# NOTE THAT WE ONLY ALLOW STOCK COUNTERS TO BE VIEWED BY SUPER USERS! (ie IsSuperUser)
	# WE DO NOT WANT NORMAL USERS TO EDIT ANY STOCK COUNTERS!
	permission_classes = (IsSuperUser,)
	filter_backends = (filters.SearchFilter,)
	search_fields = ('name', 'code', 'exchange')


# View API Stock Analyses list
class StockAnalysesViewSet(viewsets.ModelViewSet):
	serializer_class = StockAnalysisSerializer
	queryset = StockAnalysis.objects.all()
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsUser, StockAnalysisPermissions)
	filter_backends = (filters.SearchFilter,)
	search_fields = ('author__email', 'stock__name')
