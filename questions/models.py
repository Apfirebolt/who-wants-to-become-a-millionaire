from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    hint = models.CharField(max_length=255, blank=True)
    option1 = models.CharField(max_length=255, blank=True)
    option2 = models.CharField(max_length=255, blank=True)
    option3 = models.CharField(max_length=255, blank=True)
    option4 = models.CharField(max_length=255, blank=True)


    def __str__(self):
        return self.text + " - " + self.answer