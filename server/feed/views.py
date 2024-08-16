from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.views import APIView
from account.models import *
from feed.serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class PostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        search_query = request.GET.get('q')
        filter_query = request.GET.get('query')
        filter_tag = request.GET.get('tag')

        if search_query:
            posts = Post.objects.filter(is_active=True).filter(
                title__icontains=search_query).order_by('-id')

        elif filter_query:
            posts = Post.objects.filter(is_active=True).filter(
                title__icontains=filter_query).order_by('-id')

        elif filter_tag:
            posts = Post.objects.filter(is_active=True).filter(tag=filter_tag).order_by('-id')

        elif filter_query and filter_tag:
            posts = Post.objects.filter(is_active=True).filter(
                title__icontains=filter_query).filter(tag=filter_tag).order_by('-id')

        else:
            if request.user.is_authenticated:
                followed_people = Follow.objects.filter(follower=request.user).values('following')

                if(len(followed_people)):
                    posts = Post.objects.filter(is_active=True).filter(author__in=followed_people).order_by('-id')
                else:
                    posts = Post.objects.filter(is_active=True).order_by('-id')
            else:
                posts = Post.objects.filter(is_active=True).order_by('-id')
        
        post_serializer = PostSerializer(posts, many=True)
        return Response(post_serializer.data)

    def post(self, request):
        post_serializer = PostSerializer(
            data=request.data, context={'request': request})

        if post_serializer.is_valid():
            post_serializer.save()
            return Response(post_serializer.data)
        else:
            return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SinglePostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        post.visits += 1
        post.save()
        post_serializer = PostSerializer(post)
        return Response(post_serializer.data)

    def put(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(
            post, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if Post.objects.filter(id=pk).exists():
            post_serializer = Post.objects.get(id=pk)
            post_serializer.delete()
            return Response("Success")
        return Response(status=status.HTTP_400_BAD_REQUEST)


class TrendingPostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        posts = Post.objects.filter(
            is_active=True).order_by('-visits')[:5]
        post_serializer = PostSerializer(posts, many=True)

        return Response(post_serializer.data)


def update_vote_counts(post):
    post.upvote_count = Vote.objects.filter(post=post, vote=1).count()
    post.downvote_count = Vote.objects.filter(post=post, vote=-1).count()
    post.save()

class VoteView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, post_id):
        user = request.user
        vote_type = request.data.get('type')

        if vote_type not in ['up', 'down']:
            return Response({'detail': 'Invalid vote type.'}, status=status.HTTP_400_BAD_REQUEST)

        post = Post.objects.get(id=post_id)

        # Convert the vote type to integer
        vote_value = Vote.UPVOTE if vote_type == 'up' else Vote.DOWNVOTE

        # Check for an existing vote by this user on the post
        existing_vote = Vote.objects.filter(user=user, post=post).first()

        if existing_vote:
            if existing_vote.type != vote_value:
                # Update the existing vote
                if vote_value == Vote.UPVOTE:
                    post.upvote_count += 1
                    post.downvote_count -= 1
                else:
                    post.downvote_count += 1
                    post.upvote_count -= 1
                existing_vote.type = vote_value
                existing_vote.save()
            # If the vote is the same as the existing one, do nothing
        else:
            # New vote
            if vote_value == Vote.UPVOTE:
                post.upvote_count += 1
            else:
                post.downvote_count += 1
            Vote.objects.create(user=user, post=post, type=vote_value)

        post.save()
        return Response({'detail': 'Vote registered successfully.'}, status=status.HTTP_201_CREATED)



class MyPostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        posts = Post.objects.filter(author=request.user).order_by('-id')
        post_serializer = PostSerializer(posts, many=True)
        return Response(post_serializer.data)


def commentHandler(pk):
    total_comments = Comment.objects.filter(feed_id=pk).count()
    post = Post.objects.filter(id=pk).first()
    post.total_comments = total_comments
    post.save()


class CommentView(APIView):
    def get(self, request, pk):
        comments = Comment.objects.filter(feed_id=pk).order_by('-id')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        data = request.data
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user, feed_id=pk)
            commentHandler(pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
