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

    def get_likes_count(self, obj):
        return obj.liked_posts.count()
    
    class Meta:
        model = api_models.Post
        fields = '__all__'