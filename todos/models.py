from email.policy import default
from django.db import models
# Create your models here.

class TodoDiary(models.Model):
    id = models.IntegerField(primary_key=True)
    todos = models.JSONField(default=dict)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)