from csv import list_dialects
from django.contrib import admin

# Register your models here.
from .models import TodoDiary

class TodoDiaryAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title[0]', 'content', 'created_at',)

admin.site.register(TodoDiary)