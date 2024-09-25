from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', PostView.as_view()),
    path('explore/', ExploreView.as_view()),
    path('my-posts/', MyPostView.as_view()),
    path('<int:pk>/', SinglePostView.as_view()),
    path('edit/<int:pk>/',SinglePostView.as_view()),
    path('delete/<int:pk>/',SinglePostView.as_view()),
    path('post/<int:post_id>/report/', ReportView.as_view()),
    path('trending/', TrendingPostView.as_view()),
    path('<int:post_id>/vote/<str:vote_type>/', VoteView.as_view()),
    path('comment/<int:post_id>/', CommentView.as_view()),
    path('comment/<int:post_id>/<int:comment_id>', CommentView.as_view()),
]
