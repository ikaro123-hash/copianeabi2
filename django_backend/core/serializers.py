from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, Event, Category, Tag, ContactMessage, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    is_published = serializers.ReadOnlyField()
    
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'author', 
            'image', 'status', 'publication_date', 'created_at', 
            'updated_at', 'category', 'tags', 'views', 'featured', 
            'is_published'
        ]
        read_only_fields = ['slug', 'views', 'created_at', 'updated_at']


class PostListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listagem de posts"""
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'excerpt', 'author', 'image', 
            'publication_date', 'category', 'tags', 'views', 'featured'
        ]


class EventSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    is_upcoming = serializers.ReadOnlyField()
    is_public_and_upcoming = serializers.ReadOnlyField()
    speakers_list = serializers.ReadOnlyField()
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'description', 'start_date', 'end_date',
            'location', 'visibility', 'event_type', 'capacity', 'registered',
            'organizer', 'speakers', 'speakers_list', 'tags', 'image', 'status',
            'featured', 'registration_required', 'price', 'created_at',
            'updated_at', 'is_upcoming', 'is_public_and_upcoming'
        ]
        read_only_fields = ['slug', 'registered', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validação para garantir que end_date > start_date"""
        if data.get('start_date') and data.get('end_date'):
            if data['end_date'] <= data['start_date']:
                raise serializers.ValidationError(
                    "A data de fim deve ser posterior à data de início."
                )
        return data


class EventListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listagem de eventos"""
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'description', 'start_date', 'end_date',
            'location', 'event_type', 'organizer', 'tags', 'image', 
            'featured', 'price'
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['created_at']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['user', 'role', 'created_at']
