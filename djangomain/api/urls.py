from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet

router = routers.DefaultRouter()
# Router now allows us to route to /users endpoints
router.register('users', UserViewSet)

urlpatterns = [
	# 127.0.0.1:8000/api/users/ (Lets you see all users in database)
	# 127.0.0.1:8000/api/users/*/ (Substitute * with individual user id)
	path('', include(router.urls)),
]
