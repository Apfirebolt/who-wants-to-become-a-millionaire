from django.urls import path
from . views import ListCustomUsersApiView, CreateCustomUserApiView, ListQuestionsApi, ListQuizesApi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register', CreateCustomUserApiView.as_view(), name='signup'),
    path('login', TokenObtainPairView.as_view(), name='signin'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('users', ListCustomUsersApiView.as_view(), name='list-users'),
    path('quiz', ListQuizesApi.as_view(), name='list-quizes'),
    path('questions', ListQuestionsApi.as_view(), name='list-questions'),
]