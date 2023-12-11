"""
Tests for question APIs.
"""
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from questions.models import (
    Quiz, Question
)

from api.serializers import (
    QuizSerializer
)

CREATE_QUIZ_URL = reverse('api:create-quiz')
QUIZ_URL = reverse('api:list-quizes')


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


class PublicQuestionAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test no auth is required to call API."""
        res = self.client.get(QUIZ_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)


class PrivatequestionApiTests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(email='user@example.com', password='test123')
        self.client.force_authenticate(self.user)
    