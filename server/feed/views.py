from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.views import APIView
from account.models import *
from feed.serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from drf_spectacular.utils import extend_schema_view, OpenApiParameter, OpenApiTypes, extend_schema, inline_serializer
from rest_framework import status
from rest_framework import serializers as drf_serializers

@extend_schema_view(
    get = extend_schema(
        parameters=[
            OpenApiParameter("q", OpenApiTypes.STR, required=False),
            OpenApiParameter("query", OpenApiTypes.STR, required=False),
            OpenApiParameter("tag", OpenApiTypes.STR, required=False),
        ],
        responses={
            200: PostSerializer(many=True)
        }
    )
)
class PostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

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

@extend_schema_view(
    delete = extend_schema(
        responses={
            204: inline_serializer(
                name="SinglePostDeleteView",
                fields={
                    "msg": drf_serializers.CharField(
                        default="Success"
                    ),
                }
            )
        }
    )
)
class SinglePostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        post.visits = post.visits + 1
        post.save()
        post_serializer = PostSerializer(post)
        return Response(post_serializer.data)

    def put(self, request, pk):
        print(pk)
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(
            post, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if (Post.objects.filter(id=pk)).exists():
            post_serializer = Post.objects.get(id=pk)
            post_serializer.delete()
            return Response({"msg": "Success"}, status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@extend_schema_view(
    get = extend_schema(
        responses = {
            200: PostSerializer(many=True)
        }
    )
)
class TrendingPostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get(self, request):
        posts = Post.objects.filter(
            is_active=True).order_by('-visits')[:5]
        post_serializer = PostSerializer(posts, many=True)

        return Response(post_serializer.data)


def likeHandler(pk):
    total_likes = LikePost.objects.filter(post=pk).count()
    post = Post.objects.filter(id=pk).first()
    post.total_likes = total_likes
    post.save()

@extend_schema_view(
    post=extend_schema(
        request=None,
        responses={
            201: LikePostSerializer()
        }
    )
)
class LikePostView(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = LikePostSerializer

    def post(self, request, pk):
        liker = request.user
        check = LikePost.objects.filter(user=liker, post_id=pk).last()
        if check:
            check.delete()
            likeHandler(pk)
            return Response(status=status.HTTP_200_OK)

        new_like = LikePost.objects.create(user=liker, post_id=pk)
        new_like.save()
        likeHandler(pk)
        serializer = LikePostSerializer(new_like)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MyPostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

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
    serializer_class = CommentSerializer

    def get(self, request, pk):
        comments = Comment.objects.filter(feed_id=pk).order_by('-id')
        print(comments)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        data = request.data
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user, feed_id=pk)
            commentHandler(pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
