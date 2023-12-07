from django.db import models
from wwtbam.settings import AUTH_USER_MODEL


class Question(models.Model):
    text = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    hint = models.CharField(max_length=255, blank=True)
    option1 = models.CharField(max_length=255, blank=True)
    option2 = models.CharField(max_length=255, blank=True)
    option3 = models.CharField(max_length=255, blank=True)
    option4 = models.CharField(max_length=255, blank=True)
    level = models.IntegerField(default=1)


    def __str__(self):
        return self.text + " - " + self.answer
    
    def get_options(self):
        return [self.answer, self.option1, self.option2, self.option3, self.option4]
    
    def get_options_without_answer(self):
        return [self.option1, self.option2, self.option3, self.option4]
    

class Quiz(models.Model):
    name = models.CharField(max_length=255)
    questions = models.ManyToManyField(Question, related_name='quizzes', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def get_questions(self):
        return self.questions.all()
    
    def get_questions_count(self):
        return self.questions.count()
    

class QuizTaker(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, related_name='quiz_takers', on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name='quiz_takers', on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username
    
    def get_questions(self):
        return self.quiz.questions.all()
    
    def get_answers(self):
        return self.quiztakeranswer_set.all()
    
    def get_current_score(self):
        current_score = 0
        for answer in self.get_answers():
            if answer.is_correct:
                current_score += 1
        return current_score
    
    def get_current_score_percent(self):
        current_score = self.get_current_score()
        questions_count = self.quiz.get_questions_count()
        return current_score * 100 / questions_count
    
    def get_completed_questions_count(self):
        return self.get_answers().count()
    
    def get_questions_count(self):
        return self.quiz.get_questions_count()
    
    def get_remaining_questions_count(self):
        questions_count = self.get_questions_count()
        completed_questions_count = self.get_completed_questions_count()
        return questions_count - completed_questions_count
    
    def get_remaining_questions(self):
        remaining_questions = []
        for question in self.get_questions():
            if question.quiztakeranswer_set.filter(quiz_taker=self).exists():
                continue
            else:
                remaining_questions.append(question)
        return remaining_questions
    
    def get_next_question(self):
        remaining_questions = self.get_remaining_questions()
        if remaining_questions:
            return remaining_questions[0]
        else:
            return None
    
    def get_answer_by_question(self, question):
        return self.quiztakeranswer_set.get(question=question)
    
    def get_answer_by_question_id(self, question_id):
        question = Question.objects.get(id=question_id)
        return self.get_answer_by_question(question)
    
    def get_answer_by_question_text(self, question_text):
        question = Question.objects.get(text=question_text)
        return self.get_answer_by_question(question)
    
    def get_answer_by_question_number(self, question_number):
        question = self.get_questions()[question_number]
        return self.get_answer_by_question(question)
    
    def get_answer_by_question_number(self, question_number):
        question = self.get_questions()[question_number]