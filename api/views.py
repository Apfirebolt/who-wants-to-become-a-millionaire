from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from .serializers import (
    ListQuestionSerializer,
    CustomUserSerializer,
    CustomTokenObtainPairSerializer,
    ListQuizSerializer,
    QuestionSerializer,
    QuizSerializer,
    QuizTakerSerializer,
    QuizTakerDetailSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import CustomUser
from questions.models import Question, Quiz, QuizTaker


class CreateCustomUserApiView(CreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = []

    def create(self, request, *args, **kwargs):
        if CustomUser.objects.filter(email=request.data.get("email")).exists():
            return Response(
                {
                    "detail": "User with this email already exists",
                },
                status=status.HTTP_409_CONFLICT,
            )

        if CustomUser.objects.filter(username=request.data.get("username")).exists():
            return Response(
                {
                    "detail": "User with this username already exists",
                },
                status=status.HTTP_409_CONFLICT,
            )

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                {
                    "message": "User created successfully",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "message": "User not created",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = []


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
    lookup_field = "pk"

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
    lookup_field = "pk"

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        # use different serializer
        self.serializer_class = ListQuizSerializer
        return super().get(request, *args, **kwargs)


class CreateQuizTakerApi(CreateAPIView):
    serializer_class = QuizTakerSerializer
    model = QuizTaker
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "message": "Quiz taken successfully",
            },
            status=status.HTTP_201_CREATED,
        )


class ListQuizTakersApi(ListAPIView):
    serializer_class = QuizTakerDetailSerializer
    queryset = QuizTaker.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return QuizTaker.objects.filter(
            user=self.request.user,  # I think you need user.username here.
        )


class UpdateDeleteQuizTakerApi(RetrieveUpdateDestroyAPIView):
    serializer_class = QuizTakerSerializer
    queryset = QuizTaker.objects.all()
    permission_classes = (IsAuthenticated,)
    lookup_field = "pk"

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ListRandomQuestionsApi(ListAPIView):
    serializer_class = ListQuestionSerializer
    queryset = Question.objects.all()
    permission_classes = []

    def get_queryset(self):
        # return 15 random questions
        return Question.objects.order_by("?")[:15]


class CreateQuizFromRandomQuestionsApi(CreateAPIView):

    serializer_class = QuizSerializer
    model = Quiz
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # get the questions from the request
        questions = Question.objects.order_by("?")[:15]
        # create a quiz
        quiz = Quiz.objects.create(
            name=request.data["name"],
        )
        # add questions to the quiz
        for question in questions:
            quiz.questions.add(question)
        return Response(
            {
                "message": "Quiz created successfully",
            },
            status=status.HTTP_201_CREATED,
        )
