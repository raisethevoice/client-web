from rest_framework import serializers
from feed.models import Post, LikePost, Comment
from account.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(required=False)

    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        title = validated_data.pop("title")
        content = validated_data.pop("content")
        tag = validated_data.pop("tag")
        post = Post.objects.create(
            title=title, content=content, tag=tag, author=self.context['request'].user)
        return post


class LikePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = LikePost
        fields = "__all__"
        depth = 1


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        depth = 1
