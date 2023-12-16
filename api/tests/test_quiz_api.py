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



class PrivatequestionApiTests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(email='user@example.com', password='test123')
        self.client.force_authenticate(self.user)


    def test_create_quiz_success(self):
        """Test creating a quiz is successful."""
        # create questions for quiz
        question1 = create_question(text='What is 2+2?', option1='1', option2='2', option3='3', option4='4', answer='4', level=1)
        question2 = create_question(text='What is 2+3?', option1='1', option2='2', option3='3', option4='4', answer='5', level=2)

        payload = {
            'name': 'Test Quiz',
            'questions': [question1.id, question2.id]
        }
        res = self.client.post(CREATE_QUIZ_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    
    def test_delete_quiz_success(self):
        """Test deleting a quiz is successful."""
        question1 = create_question(text='What is 2+2?', option1='1', option2='2', option3='3', option4='4', answer='4', level=1)
        question2 = create_question(text='What is 2+3?', option1='1', option2='2', option3='3', option4='4', answer='5', level=2)

        payload = {
            'name': 'Test Quiz',
            'questions': [question1.id, question2.id]
        }
        res = self.client.post(CREATE_QUIZ_URL, payload)
        res = self.client.delete(detail_quiz_url(res.data['id']))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Quiz.objects.count(), 0)
    

    def test_get_quiz_success(self):
        """Test getting a quiz is successful."""
        question1 = create_question(text='What is 2+2?', option1='1', option2='2', option3='3', option4='4', answer='4', level=1)
        question2 = create_question(text='What is 2+3?', option1='1', option2='2', option3='3', option4='4', answer='5', level=2)

        payload = {
            'name': 'Test Quiz',
            'questions': [question1.id, question2.id]
        }
        res = self.client.post(CREATE_QUIZ_URL, payload)
        res = self.client.get(detail_quiz_url(res.data['id']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        
        

    
    