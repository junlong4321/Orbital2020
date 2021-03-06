from rest_framework import permissions


# Allow users to edit their own profile
class UserPermissions(permissions.BasePermission):
	def has_permission(self, request, view):
		if request.user.is_authenticated or request.user.is_superuser:
			return True
		return request.method == 'POST'

	# Allows anyone to get data (ie view profiles) if its a safe HTTP request (e.g GET, OPTIONS, HEAD)
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		# If it is not a safe HTTP request (e.g POST / Update data), we check that the id of the user currently
		# authenticated in the system has the same id as that of obj.id. We allow admins as well
		return obj.id == request.user.id or request.user.is_superuser


class IsSuperUser(permissions.IsAdminUser):
	def has_permission(self, request, view):
		return bool(request.user and request.user.is_superuser)


# Allow authors to edit their own stock analysis
class StockAnalysisPermissions(permissions.BasePermission):
	# Allows anyone to get data (ie view profiles) if its a safe HTTP request (e.g GET, OPTIONS, HEAD)
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		# If it is not a safe HTTP request (e.g POST / Update data), check that author of the analysis is the
		# same as the current user authenticated
		return obj.author == request.user or request.user.is_superuser


# Allow users to search for stocks
class StockCounterPermissions(permissions.BasePermission):
	# Allows anyone to get data (ie view profiles) if its a safe HTTP request (ie GET)
	# If it is not a safe HTTP request (e.g POST / Update data), we don't allow users to do anything.
	# (We don't want users to update, delete, or create new stock counters)
	def has_permission(self, request, view):
		return request.method == 'GET'


# Allow commenters to edit their own comments
class CommentPermissions(permissions.BasePermission):
	# Allows anyone to get data (ie view profiles) if its a safe HTTP request (e.g GET, OPTIONS, HEAD)
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		# If it is not a safe HTTP request (e.g POST / Update data), we check that commenter of the analysis is the
		# same as the current user authenticated
		return obj.commenter == request.user or request.user.is_superuser


# Allow users to edit their own bookmarks
class BookmarkPermissions(permissions.BasePermission):
	# Allows anyone to get data (ie view profiles) if its a safe HTTP request (e.g GET, OPTIONS, HEAD)
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		# If it is not a safe HTTP request (e.g POST / Update data), we check that commenter of the analysis is the
		# same as the current user authenticated
		return obj.user == request.user or request.user.is_superuser
