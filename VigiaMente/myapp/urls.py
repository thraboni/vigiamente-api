from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('login-page/', views.login_page, name='login-page'),
    path('signup/', views.signup, name='signup'),  # Nova rota para o cadastro de usuário
    path('signup-page/', views.signup_page, name='signup-page'),  # Nova rota para a página de cadastro
]
