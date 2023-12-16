from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from . serializers import ListQuestionSerializer,  CustomUserSerializer, CustomTokenObtainPairSerializer, ListQuizSerializer \
    , QuestionSerializer, QuizSerializer, QuizTakerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import CustomUser
from questions.models import Question, Quiz, QuizTaker


class CreateCustomUserApiView(CreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer


class ListCustomUsersApiView(ListAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]


class ListQuestionsApi(ListAPIView):
    serializer_class = ListQuestionSerializer
    queryset = Question.objects.all()
    permission_classes = [IsAuthenticated]


class CreateQuestionApi(CreateAPIView):
    serializer_class = QuestionSerializer
    model = Question
    permission_classes = [IsAuthenticated]


class UpdateDeleteQuestionApi(RetrieveUpdateDestroyAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class ListQuizesApi(ListAPIView):
    serializer_class = ListQuizSerializer
    queryset = Quiz.objects.all()
    permission_classes = [IsAuthenticated]


class CreateQuizApi(CreateAPIView):
    serializer_class = QuizSerializer
    model = Quiz
    permission_classes = [IsAuthenticated]


class UpdateDeleteQuizApi(RetrieveUpdateDestroyAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
    permission_classes = (IsAuthenticated,)
    lookup_field = 'pk'


    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class CreateQuizTakerApi(CreateAPIView):
    serializer_class = QuizTakerSerializer
    model = QuizTaker
    permission_classes = [IsAuthenticated]


class ListQuizTakersApi(ListAPIView):
    serializer_class = QuizTakerSerializer
    queryset = QuizTaker.objects.all()
    permission_classes = [IsAuthenticated]


