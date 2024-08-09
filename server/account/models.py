from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    type = models.CharField(max_length=100, default="READER")

    def __str__(self):
        return self.username


class Profile(models.Model):
    bio = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=200, blank=True)
    website = models.URLField(max_length=100, blank=True)
    avatar = models.ImageField(
        upload_to="avatar", default="", blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(max_length=50, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return (self.user.email)


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='follower')
    following = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='following')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} is following to {}".format(self.follower, self.following)
