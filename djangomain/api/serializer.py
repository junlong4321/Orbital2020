from rest_framework import serializers
from .models import UserProfile


# Converts User data to JSON
class UserProfileSerializer(serializers.ModelSerializer):
	# Serialize metadata from UserProfile model
	class Meta:
		model = UserProfile
		fields = ('id', 'email', 'password', 'name', 'biography', 'linkedin', 'profile_picture')
		# id can only be read but cannot be modified
		read_only_fields = ('id',)
		# 'write_only' means that we hide the user password when we see user list
		# 'required' means that we will still need a password to create a
		# user although we hide the user password
		extra_kwargs = {'password': {'write_only': True, 'required': True}}

	# Do not add a token here while creating a profile. We should only start assigning tokens after we have created
	# the profile so that we prevent users who try to impersonate using token authentication.
	def create(self, validated_data):
		user = UserProfile(
			email=validated_data['email'],
			# User have to input a name when they attempt to register
			name=validated_data['name'],
		)
		# Set and hash password
		user.set_password(validated_data['password'])
		user.save()
		return user
