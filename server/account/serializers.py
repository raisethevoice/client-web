from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed
from account.models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email',
                  'username', 'password', 'type', 'profile', 'is_active']
        extra_kwargs = {'type': {'required': False},
                        'profile': {'required': False}, 'password': {'required': False}}


    def create(self, validated_data):
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        user = User.objects.create_user(first_name=first_name, last_name=last_name,
                                        username=username, email=email, password=password, is_active=True)

        return user


class ChangePasswordSerializer(serializers.Serializer):
    class Meta:
        model = User

    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    extra_kwargs = {'superadmin': {'required': False},
                    'identity': {'required': False}}


class UserInfoSerialzer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username']
        depth = 1


class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        depth = 1

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = "__all__"
        depth = 1

