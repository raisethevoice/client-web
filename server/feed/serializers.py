from rest_framework import serializers
from feed.models import Post, LikePost, Comment
from account.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(required=False, read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
        extra_kwargs = {
            "visits": {'read_only': True},
            "total_likes": {'read_only': True},
            "total_comments": {'read_only': True},
            "is_active": {'read_only': True},
        }

    def create(self, validated_data):
        title = validated_data.pop("title")
        content = validated_data.pop("content")
        tag = validated_data.pop("tag")
        post = Post.objects.create(
            title=title, content=content, tag=tag, author=self.context['request'].user)
        return post


class LikePostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = LikePost
        fields = "__all__"
        depth = 2


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
        depth = 1
        extra_kwargs = {
            "total_likes": {"read_only": True}
        }
