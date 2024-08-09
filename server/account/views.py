from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.db.models import Q
from django.http import HttpResponse

from django.shortcuts import redirect
from django.template import loader

from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from decouple import config

from account.models import *
from account.serializers import *
from account.token import account_activation_token
from raisethevoice import settings


class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if User.objects.filter(email=request.data["email"]):
            return Response({"detail": "Email Already Exist"}, status=status.HTTP_306_RESERVED)

        if User.objects.filter(username=request.data["username"]):
            return Response({"detail": "Username Already Exist"}, status=status.HTTP_306_RESERVED)

        if serializer.is_valid():
            serializer.save()
            user = User.objects.filter(username=request.data["username"]).first()
            user.is_active = False
            user.save()
            account_activator(request, user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors)


class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        print(serializer.initial_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if not user.is_active:
            Response({"msg: Verify your account"}, status=status.HTTP_400_BAD_REQUEST)
        token = Token.objects.get_or_create(user=user)
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
            'token': token[0].key
        })


class ChangePassword(APIView):
    def put(self, request, format=None):
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.data.get('current_password')
            if not request.user.check_password(old_password):
                return Response({"msg": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)

            request.user.set_password(serializer.data.get('new_password'))
            request.user.save()

            return Response({"msg": "Your password has been changed successfully."}, status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    def get(self, request):
        profile = Profile.objects.filter(user=request.user).first()
        profile_serializer = ProfileSerializer(profile)
        return Response(profile_serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

class UsersView(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        # users = User.objects.filter(~Q(id=request.user.id) & Q(is_active=True) & ~Q(Follow.objects.filter(~Q(follower=request.user)))).order_by(
        #     "?")[:5]
        users = User.objects.exclude(id=request.user.id).filter(is_active=True).order_by('-date_joined')[:5]

        user_serializer = UserSerializer(users, many=True)
        return Response(user_serializer.data)


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response({"msg: Logged out"}, status=status.HTTP_200_OK)


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.filter(user=request.user).first()
        profile_serializer = ProfileSerializer(profile)
        return Response(profile_serializer.data)

    def post(self, request):
        if not request.user:
            serializer = ProfileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.user = request.user
                serializer.save()
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_226_IM_USED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        data = request.data
        profile = Profile.objects.filter(id=pk).first()
        user = User.objects.filter(id=request.user.id).first()
        if data.get('first_name'):
            user.first_name = data['first_name']
            user.save()
        if data.get('last_name'):
            user.last_name = data['last_name']
            user.save()
        if profile:
            serializer = ProfileSerializer(profile, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


def ping(request):
    return HttpResponse('pong')


def account_activator(request, user):
    mail_subject = 'Activation link has been sent to your email'
    current_site = get_current_site(request)
    template = loader.get_template('email_template.txt')
    context = {
        'user': user,
        'date': str(user.date_joined)[:10],
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.id)),
        'token': account_activation_token.make_token(user),
    }
    message = template.render(context)

    to_email = user.email
    email = EmailMultiAlternatives(
        mail_subject, message, to=[to_email]
    )
    email.content_subtype = 'html'
    email.send()


def activate(request, uidb64, token):
    user = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect(config('CLIENT_URL', default="http://localhost:3000") + "/login")
    else:
        return redirect(config('CLIENT_URL', default="http://localhost:3000") + "/login")


class FollowView(APIView):
    def get(self, request):
        followings = Follow.objects.filter(follower=request.user)
        serializer = FollowSerializer(followings, many=True)
        return Response(serializer.data)

    def post(self, request):
        pk = request.GET.get('id')[:-1]
        user = User.objects.filter(id=pk).first()
        exist = Follow.objects.filter(following=user, follower=request.user).first()
        if exist:
            exist.delete()
            return Response({"msg: Started Unfollowing {}".format(user.first_name)}, status=status.HTTP_200_OK)
        else:
            Follow.objects.create(following=user, follower=request.user)
            return Response({"msg: Started Following {}".format(user.first_name)}, status=status.HTTP_201_CREATED)


class AvatarView(APIView):
    def get(self, request):
        return HttpResponse("Are you there?")
    def put(self, request):
        profile = Profile.objects.filter(user=request.user).first()
        data = request.data
        serializer = ProfileSerializer(profile, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
