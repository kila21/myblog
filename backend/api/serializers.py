from rest_framework import serializers

from api import models as api_models

class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    def get_post_count(self, category):
        return category.posts.count()
    
    class Meta:
        model = api_models.Category
        fields = ['id', 'title', 'image', 'slug', 'post_count']


class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    author_username = serializers.CharField(source='author.username', read_only=True)
    is_bookmarked = serializers.SerializerMethodField()
    bookmarkes_count = serializers.SerializerMethodField()

    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_is_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return user in obj.likes.all()
        return False
    
    def get_bookmarkes_count(sef, obj):
        return obj.bookmarked_by.count()
    
    def get_is_bookmarked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return user in obj.bookmarked_by.all()
        return False

    
    class Meta:
        model = api_models.Post
        fields = '__all__'
    
class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Post
        exclude = ['author', 'slug', 'likes', 'view', 'tags']
    
# Comments Serializers

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = api_models.Comment
        fields = ['author', 'author_username', 'post', 'text', 'created_at']
        read_only_fields = ['author', 'created_at']
