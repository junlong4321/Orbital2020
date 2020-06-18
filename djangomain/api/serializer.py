from rest_framework import serializers
from .models import UserProfile, StockAnalysis, StockAnalysisImage, StockCounter


# Converts User data to JSON
class UserProfileSerializer(serializers.ModelSerializer):
	# Serialize metadata from UserProfile model
	class Meta:
		model = UserProfile
		fields = ('id', 'email', 'password', 'name', 'biography', 'linkedin', 'profile_picture',)
		# id can only be read but cannot be modified
		read_only_fields = ('id',)
		# 'write_only' means that we hide the user password when we see user list
		# 'required' means that we will still need a password to create a
		# user although we hide the user password
		extra_kwargs = {'password': {'write_only': True, 'required': True}}

	def create(self, validated_data):
		# Do not add a token here while creating a profile. We should only start assigning tokens after we have created
		# the profile so that we prevent users who try to impersonate using token authentication.
		# def create(self, validated_data):
		# images_data = self.context.get('view').request.FILES
		user = UserProfile(
			email=validated_data['email'],
			# User have to input a name when they attempt to register
			name=validated_data['name'],
			biography=validated_data['biography'],
			linkedin=validated_data['linkedin'],
			profile_picture=validated_data['profile_picture'],
		)
		# Set and hash password
		user.set_password(validated_data['password'])
		user.save()
		return user


# Shows stock names and their associated counter codes
class StockCounterSerializer(serializers.ModelSerializer):
	class Meta:
		model = StockCounter
		fields = '__all__'


# Helps to serialize multiple images
# To be used in TaskSerializer
class StockAnalysisImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = StockAnalysisImage
		fields = ('image',)


# Converts analysis data to JSON
class StockAnalysisSerializer(serializers.ModelSerializer):
	# many=True tells serializer that there are multiple images to be serialized
	images = StockAnalysisImageSerializer(many=True, required=False, read_only=True)

	class Meta:
		model = StockAnalysis
		fields = '__all__'

	def create(self, validated_data):
		images_data = self.context.get('view').request.FILES
		analysis = StockAnalysis.objects.create(**validated_data)
		for image_data in images_data.values():
			StockAnalysisImage.objects.create(analysis=analysis, image=image_data)
		return analysis
