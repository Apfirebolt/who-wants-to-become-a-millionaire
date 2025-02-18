"""
Tests for question APIs.
"""
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from questions.models import (
    Quiz, QuizTaker, Question
)

CREATE_QUIZ_URL = reverse('api:create-quiz')
CREATE_QUIZ_TAKER_URL = reverse('api:create-quiz-taker')
LIST_QUIZ_TAKER_URL = reverse('api:list-quiz-takers')
CREATE_QUESTION_URL = reverse('api:create-question')


def detail_quiz_url(pk):
    """Create and return a quiz detail URL."""
    return reverse('api:crud-quiz', args=[pk])


def create_quiz(**params):
    """Create and return a sample Quiz."""

    quiz = Quiz.objects.create(**params)
    return quiz


def create_question(**params):
    """Create and return a sample Question."""

    question = Question.objects.create(**params)
    return question


def create_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params)



class PrivateQuestionApiTests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(email='user@example.com', password='test123')
        self.client.force_authenticate(self.user)


    def test_create_quiz_taker(self):
        """Test creating a quiz taker is successful."""
        # create questions for quiz
        quiz = create_quiz(name='Test Quiz')
        payload = {
            'quiz': quiz.id,
            'user': self.user.id,
            'completed': False,
            'score': 0,
        }
        res = self.client.post(CREATE_QUIZ_TAKER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['message'], 'Quiz taken successfully')
        

    
    def test_list_quiz_takers(self):
        """Test listing quiz takers is successful."""
        # create questions for quiz
        quiz = create_quiz(name='Test Quiz')
        quiz_taker1 = QuizTaker.objects.create(quiz=quiz, user=self.user)
        quiz_taker2 = QuizTaker.objects.create(quiz=quiz, user=self.user)
        res = self.client.get(LIST_QUIZ_TAKER_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        # self.assertEqual(res.data[0]['quiz'], quiz_taker1.quiz.id)
        # self.assertEqual(res.data[0]['user'], quiz_taker1.user.id)
        # self.assertEqual(res.data[1]['quiz'], quiz_taker2.quiz.id)
        # self.assertEqual(res.data[1]['user'], quiz_taker2.user.id)
