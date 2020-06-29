from rest_framework import serializers
from .models import UserProfile, StockAnalysis, StockAnalysisImage, StockCounter, Comment, Bookmark


# Converts User data to JSON
# Implement PATCH request with PatchModelSerializer (ie users do not have to provide name, email,
# and password when updating biography and linkedin)
class UserProfileSerializer(serializers.ModelSerializer):
	# Serialize metadata from UserProfile model
	class Meta:
		model = UserProfile
		fields = ('id', 'email', 'password', 'name', 'biography', 'linkedin', 'profile_picture', 'total_upvotes')
		# id can only be read but cannot be modified
		read_only_fields = ('id',)
		# 'write_only' means that we hide the user password when we see user list
		# 'required' means that we will still need a password to create a
		# user although we hide the user password
		extra_kwargs = {'password': {'write_only': True, 'required': True}}

	def create(self, validated_data):
		# Do not add a token here while creating a profile. We should only start assigning tokens after we have created
		# the profile so that we prevent users who try to impersonate using token authentication.
		user = UserProfile(
			email=validated_data['email'],
			# User have to input a name when they attempt to register
			name=validated_data['name'],
			# biography=validated_data['biography'],
			# linkedin=validated_data['linkedin'],
			# profile_picture=validated_data['profile_picture'],
			total_upvotes=0,
		)
		# Set and hash password
		user.set_password(validated_data['password'])
		user.save()
		return user

	# Define our own custom update because if we update password using default update, password is not
	# hashed after the update and it also causes issues authenticating users into the database.
	def update(self, instance, validated_data):
		for attr, value in validated_data.items():
			# Rehash password here
			if attr == 'password':
				instance.set_password(value)
			else:
				setattr(instance, attr, value)
		instance.save()
		return instance


# Shows stock names and their associated counter codes
class StockCounterSerializer(serializers.ModelSerializer):
	class Meta:
		model = StockCounter
		fields = '__all__'


# Helps to serialize multiple images
# To be used in StockAnalysisSerializer
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

	def update(self, instance, validated_data):
		images_data = self.context.get('view').request.FILES
		for image in images_data.values():
			StockAnalysisImage.objects.create(analysis=instance, image=image)
		return super(StockAnalysisSerializer, self).update(instance, validated_data)


class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
	class Meta:
		model = Bookmark
		fields = '__all__'
