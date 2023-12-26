from django.core.management.base import BaseCommand
import json
import random
from questions.models import Question


class Command(BaseCommand):
    help = 'Populates Questions Database from json file'

    def handle(self, *args, **kwargs):
        
        with open('data/questions.json') as f:
            questions = json.load(f)

        for question in questions:
            try:
                print(question['question'])
                answer = ''
                level = random.randint(1, 3)
                if question['answer'] == 'A':
                    answer = question['A']
                elif question['answer'] == 'B':
                    answer = question['B']
                elif question['answer'] == 'C':
                    answer = question['C']
                elif question['answer'] == 'D':
                    answer = question['D']
                

                current_question = Question(
                    text=question['question'],
                    answer=answer,
                    option1=question['A'],
                    option2=question['B'],
                    option3=question['C'],
                    option4=question['D'],
                    level=level
                )
                current_question.save()

            except Exception as err:
                print('Could not save this question ', err)


        







