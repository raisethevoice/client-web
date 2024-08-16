from rest_framework import serializers
from feed.models import Post, Vote, Comment
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


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = "__all__"
        depth = 1

    def create(self, validated_data):
        user = validated_data['user']
        post = validated_data['post']
        vote = validated_data['vote']

        # Handle vote logic
        vote_instance, created = Vote.objects.get_or_create(user=user, post=post)
        if not created:
            if vote_instance.vote != vote:
                vote_instance.vote = vote
                vote_instance.save()
        else:
            vote_instance.save()

        return vote_instance


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        depth = 1
