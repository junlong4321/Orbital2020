from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserProfileViewSet, LoginViewSet, StockAnalysisViewSet, StockCounterViewSet, CommentViewSet, \
	BookmarkViewSet

router = routers.DefaultRouter()
# Router now allows us to route to /users endpoints
# Note that we don't have to specify base_name = '...' because we are using a ModelViewSet
# Django will figure things out on its own
router.register('users', UserProfileViewSet)
# Have to specify basename for LoginViewSet as LoginViewSet is not a ModalViewSet
router.register('auth', LoginViewSet, basename='login')
router.register('analyses', StockAnalysisViewSet)
router.register('counters', StockCounterViewSet)
router.register('comments', CommentViewSet)
router.register('bookmarks', BookmarkViewSet)

urlpatterns = [
	# 127.0.0.1:8000/api/users/ (Lets you see all users in database)
	# 127.0.0.1:8000/api/users/{id}/ (Lets you see individual users)
	# 127.0.0.1:8000/api/auth/ (Generates login authentication token)
	# 127.0.0.1:8000/api/analyses/ (Shows all stock analyses written)
	# 127.0.0.1:8000/api/analyses/{id}/ (Shows individual stock analysis written)
	# 127.0.0.1:8000/api/counters/ (Shows all stock counters)
	# 127.0.0.1:8000/api/counters/{id}/ (Shows individual stock counters)
	# 127.0.0.1:8000/api/comments/ (Shows all comments)
	# 127.0.0.1:8000/api/comments/{id}/ (Shows individual comments)
	# 127.0.0.1:8000/api/bookmarks/ (Shows all analyses bookmarked by all users)
	# 127.0.0.1:8000/api/bookmarks/{id}/ (Shows individual bookmarks)
	path('', include(router.urls)),
]
