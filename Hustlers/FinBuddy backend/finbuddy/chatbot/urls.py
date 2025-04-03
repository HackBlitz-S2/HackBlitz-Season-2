from django.urls import path
from .views import ai_chatbot

urlpatterns = [
    path('chat/', ai_chatbot, name='ai_chatbot'),
]
