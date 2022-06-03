from django import views
from django.urls import path
from . import views

app_name = 'todos'

urlpatterns = [
    path('', views.todo, name='todo'),
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
    path('index/', views.index, name='index'),
    path('delete/<int:pk>/', views.delete, name='delete'),
]
