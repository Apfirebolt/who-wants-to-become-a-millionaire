from django.core.management.base import BaseCommand
from questions.models import Question


class Command(BaseCommand):
    help = 'Clears already populated Question data from the database'

    def handle(self, *args, **kwargs):

        questions = Question.objects.all()
        
        for question in questions:
            try:
                print(f'Deleting item {question.text}')
                question.delete()
            except Exception as err:
                print('Could not delete ', err)