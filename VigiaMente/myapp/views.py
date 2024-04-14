from django.shortcuts import render
from django.http import JsonResponse
from .models import Usuario
from django.contrib.auth.models import User

def login(request):
    if request.method == 'POST':
        data = request.POST
        username = data.get('username')
        password = data.get('password')

        # Aqui você pode implementar a lógica de autenticação
        # Verificar o usuário e senha no banco de dados

        # Por enquanto, vamos apenas retornar os dados recebidos para teste
        return JsonResponse({'username': username, 'password': password})
    else:
        return JsonResponse({'error': 'Método não permitido'}, status=405)

def login_page(request):
    return render(request, 'myapp/login.html')

def signup(request):
    if request.method == 'POST':
        data = request.POST
        username = data.get('username')
        password = data.get('password')

        # Verifica se o usuário já existe
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Usuário já existe'}, status=400)

        # Cria um novo usuário
        user = User.objects.create_user(username=username, password=password)

        # Retorna uma resposta de sucesso
        return JsonResponse({'success': 'Usuário cadastrado com sucesso'})
    else:
        return JsonResponse({'error': 'Método não permitido'}, status=405)
    
    from django.shortcuts import render

def signup_page(request):
    return render(request, 'myapp/signup.html')

