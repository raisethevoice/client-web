from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('signup/', views.SignUpView.as_view()),
    path('login/', views.LoginView.as_view(), name="login"),
    path('token/', obtain_auth_token),
    path('logout/', views.LogoutView.as_view()),
    path('user/', views.UserView.as_view()),
    path('follow/', views.FollowView.as_view()),
    path('users/', views.UsersView.as_view()),
    path('avatar/', views.AvatarView.as_view()),
    path('change-password/', views.ChangePassword.as_view()),
    path('profile/<int:pk>/', views.ProfileView.as_view()),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),

    path('ping/', views.ping)
]
