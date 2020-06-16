from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserProfileViewSet, LoginViewSet

router = routers.DefaultRouter()
# Router now allows us to route to /users endpoints
# Note that we don't have to specify base_name = '...' because we are using a ModelViewSet
# Django will figure things out on its own
router.register('users', UserProfileViewSet)
# Have to specify basename for LoginViewSet as LoginViewSet is not a ModalViewSet
router.register('auth', LoginViewSet, basename='login')

urlpatterns = [
	# 127.0.0.1:8000/api/users/ (Lets you see all users in database)
	# 127.0.0.1:8000/api/users/<id>/ (Lets you see individual users)
	# 127.0.0.1:8000/api/auth/ (Shows all authentication tokens)
	path('', include(router.urls)),
]
