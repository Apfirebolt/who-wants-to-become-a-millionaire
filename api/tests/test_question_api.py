"""
Tests for question APIs.
"""
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from questions.models import (
    Question
)

from api.serializers import (
    QuestionSerializer
)

CREATE_QUESTION_URL = reverse('api:create-question')
QUESTION_URL = reverse('api:list-questions')


def detail_question_url(pk):
    """Create and return a question detail URL."""
    return reverse('api:crud-question', args=[pk])


def create_question(**params):
    """Create and return a sample Question."""

    question = Question.objects.create(**params)
    return question


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
        res = self.client.get(QUESTION_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)


class PrivatequestionApiTests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(email='user@example.com', password='test123', username='Test Name')
        self.client.force_authenticate(self.user)

    
    def test_create_question_success(self):
        """Test creating a question is successful."""
        payload = {
            'text': 'Test Question',
            'answer': 'Test Answer',
            'option1': 'Test Option 1',
            'option2': 'Test Option 2',
            'option3': 'Test Option 3',
            'option4': 'Test Option 4',
            'level': 1
        }
        res = self.client.post(CREATE_QUESTION_URL, payload)
        # print('Res after test case ', res.data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        question = Question.objects.get(text=payload['text'])
        self.assertTrue(question)
        self.assertIn('text', res.data)
        self.assertTrue(question.answer, payload['answer'])

    
    def test_delete_question_success(self):
        """Test deleting a question is successful."""
        question = create_question(
            text='Test Question',
            answer='Test Answer',
            option1='Test Option 1',
            option2='Test Option 2',
            option3='Test Option 3',
            option4='Test Option 4',
            level=1
        )
        res = self.client.delete(detail_question_url(question.id))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        question_exists = Question.objects.filter(
            text=question.text
        ).exists()
        self.assertFalse(question_exists)

    
    def test_get_question_success(self):
        """Test getting a question is successful."""
        question = create_question(
            text='Test Question',
            answer='Test Answer',
            option1='Test Option 1',
            option2='Test Option 2',
            option3='Test Option 3',
            option4='Test Option 4',
            level=1
        )
        res = self.client.get(detail_question_url(question.id))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['text'], question.text)

    
    def test_update_question_success(self):
        """Test updating a question is successful."""
        question = create_question(
            text='Test Question',
            answer='Test Answer',
            option1='Test Option 1',
            option2='Test Option 2',
            option3='Test Option 3',
            option4='Test Option 4',
            level=1
        )
        payload = {
            'text': 'Test Question Updated',
            'answer': 'Test Answer Updated',
            'option1': 'Test Option 1 Updated',
            'option2': 'Test Option 2 Updated',
            'option3': 'Test Option 3 Updated',
            'option4': 'Test Option 4 Updated',
            'level': 2
        }
        res = self.client.put(detail_question_url(question.id), payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        question.refresh_from_db()
        self.assertEqual(question.text, payload['text'])
        self.assertEqual(question.answer, payload['answer'])
        self.assertEqual(question.option1, payload['option1'])
        self.assertEqual(question.option2, payload['option2'])
        self.assertEqual(question.option3, payload['option3'])
        self.assertEqual(question.option4, payload['option4'])
        self.assertEqual(question.level, payload['level'])
    