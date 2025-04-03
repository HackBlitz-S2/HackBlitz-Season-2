from django.urls import path
from .views import add_expense, get_expenses

urlpatterns = [
    path('add/', add_expense, name='add_expense'),
    path('list/', get_expenses, name='get_expenses'),
]
