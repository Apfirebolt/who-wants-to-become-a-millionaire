from django.contrib import admin

from .models import Question, Quiz, QuizTaker

admin.site.register(Question)
admin.site.register(Quiz)
admin.site.register(QuizTaker)
