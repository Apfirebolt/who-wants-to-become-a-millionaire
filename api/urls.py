from django.urls import path
from . views import ListCustomUsersApiView, CreateCustomUserApiView, ListQuestionsApi, ListQuizesApi, CustomTokenObtainPairView, \
    CreateQuestionApi, CreateQuizApi, UpdateDeleteQuestionApi, UpdateDeleteQuizApi, CreateQuizTakerApi, ListQuizTakersApi
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register', CreateCustomUserApiView.as_view(), name='signup'),
    path('login', CustomTokenObtainPairView.as_view(), name='signin'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('users', ListCustomUsersApiView.as_view(), name='list-users'),
    path('quiz', ListQuizesApi.as_view(), name='list-quizes'),
    path('quiz/create', CreateQuizApi.as_view(), name='create-quiz'),
    path('quiz/<int:pk>', UpdateDeleteQuizApi.as_view(), name='crud-quiz'),
    path('questions', ListQuestionsApi.as_view(), name='list-questions'),
    path('questions/create', CreateQuestionApi.as_view(), name='create-question'),
    path('questions/<int:pk>', UpdateDeleteQuestionApi.as_view(), name='crud-question'),
    path('take-quiz', ListQuizTakersApi.as_view(), name='list-quiz-takers'),
    path('take-quiz/create', CreateQuizTakerApi.as_view(), name='create-quiz-taker'),
]