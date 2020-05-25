from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Converts User data to JSON
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'password', 'email']
		# 'write_only' means that we hide the user password when we see user list
		# 'required' means that we will still need a password to create a
		# user although we hide the user password
		extra_kwargs = {'password': {'write_only': True, 'required': True}}

	# Override built-in create method of user to hash password
	def create(self, validated_data):
		user = User.objects.create_user(**validated_data)
		# Generate a token for each user
		Token.objects.create(user=user)
		return user


