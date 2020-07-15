from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from .serializer import UserProfileSerializer, StockAnalysisSerializer, StockCounterSerializer, CommentSerializer, \
	BookmarkSerializer
from .models import UserProfile, StockAnalysis, StockCounter, Comment, Bookmark
from .permissions import UserPermissions, StockAnalysisPermissions, CommentPermissions, \
	BookmarkPermissions, StockCounterPermissions, IsSuperUser
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated


# View API User list
# 127.0.0.1:8000/api/users/
class UserProfileViewSet(viewsets.ModelViewSet):
	serializer_class = UserProfileSerializer
	# queryset tells ViewSet what objects to retrieve from our database (ie retrieve all UserProfile objects)
	queryset = UserProfile.objects.all()
	# Since users have been created already here, we can send a POST request for a token when user logs in
	authentication_classes = (TokenAuthentication,)
	# Only allow logged in users / admins to send a PUT/PATCH to change their own profile data
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
	pagination_class = LimitOffsetPagination
	queryset = StockCounter.objects.all()
	authentication_classes = (TokenAuthentication,)
	# NOTE THAT WE ONLY ALLOW STOCK COUNTERS TO BE EDITED BY SUPER USERS! (ie IsSuperUser)
	# WE DO NOT WANT NORMAL USERS TO EDIT ANY STOCK COUNTERS! (Normal users can only view stock counter, GET request)
	# Unregistered users are not allowed access to this endpoint
	permission_classes = [IsSuperUser|(IsAuthenticated&StockCounterPermissions)]
	filter_backends = (filters.SearchFilter,)
	# '^' Starts-with search. (E.g If we type 'f' into the search, only entries starting with 'f' will appear)
	search_fields = ('^name', '^code', '^exchange')


# View API Stock Analyses list
class StockAnalysisViewSet(viewsets.ModelViewSet):
	serializer_class = StockAnalysisSerializer
	queryset = StockAnalysis.objects.all()
	authentication_classes = (TokenAuthentication,)
	permission_classes = [IsAuthenticated&StockAnalysisPermissions]
	filter_backends = (filters.SearchFilter,)
	# '^' Starts-with search. (E.g If we type 'f' into the search, only entries starting with 'f' will appear)
	search_fields = ('author__email', '^ticker__code')


# View API Comment list
class CommentViewSet(viewsets.ModelViewSet):
	serializer_class = CommentSerializer
	queryset = Comment.objects.all()
	authentication_classes = (TokenAuthentication,)
	permission_classes = [IsAuthenticated&CommentPermissions]
	filter_backends = (filters.SearchFilter,)
	search_fields = ['analysis__id']


# View API Bookmark list
class BookmarkViewSet(viewsets.ModelViewSet):
	serializer_class = BookmarkSerializer
	queryset = Bookmark.objects.all()
	authentication_classes = (TokenAuthentication,)
	permission_classes = [IsAuthenticated&BookmarkPermissions]
	filter_backends = (filters.SearchFilter,)
	search_fields = ['user__email']
