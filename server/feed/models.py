from django.db import models
from ckeditor.fields import RichTextField
from account.models import User


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = RichTextField()
    tag = models.CharField(max_length=10, blank=True, null=True)
    visits = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total_likes = models.IntegerField(blank=True, default=0, null=True, name="total_likes")
    total_comments = models.IntegerField(blank=True, default=0, null=True, name="total_comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class LikePost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)


class Comment(models.Model):
    content = models.TextField(blank=True, null=True)
    feed = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    total_likes=models.IntegerField(blank=True, null=True)
    created_at=models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)


class LikeComment(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
