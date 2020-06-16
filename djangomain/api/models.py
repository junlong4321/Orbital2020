from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Manages our Custom User Model
class UserProfileManager(BaseUserManager):
	# Creates a new user profile object
	def create_user(self, email, name, password=None):
		# Make email unique and compulsory for all users
		if not email:
			raise ValueError('Users must have an email address.')
		# Normalize helps to lowercase all email characters
		email = self.normalize_email(email)
		# Create user profile object
		user = self.model(email=email, name=name)
		# Sets, hashes password, and save user
		user.set_password(password)
		user.save(using=self._db)
		return user

	# Allows us to create a superuser in the command prompt
	def create_superuser(self, email, name, password):
		# Create superuser profile object
		user = self.create_user(email, name, password)
		user.is_superuser = True
		user.is_staff = True
		user.save(using=self._db)
		return user


# Custom User Model
class UserProfile(AbstractBaseUser, PermissionsMixin):
	# Fields which our Custom User Model will have
	email = models.EmailField(max_length=225, unique=True)
	name = models.CharField(max_length=225, blank=True)
	biography = models.TextField(max_length=500, blank=True)
	linkedin = models.URLField(max_length=225, blank=True)
	profile_picture = models.ImageField(blank=True)
	# is_active is used to determine if the user is currently active in the system
	# Used for kicking out inactive users from the site
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	# User profiles are handled by the UserProfileManager
	objects = UserProfileManager()

	# Log in with email and password, and make name mandatory while registering
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['name']

	# Show display name if user has input a display name, otherwise username.
	def __str__(self):
		return "%s's profile" % self.name
