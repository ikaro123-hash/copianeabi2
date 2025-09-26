from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.generic import CreateView
from django.urls import reverse_lazy
from .forms import CustomLoginForm, CustomUserCreationForm


def custom_login(request):
    """View personalizada de login"""
    if request.user.is_authenticated:
        return redirect('admin_dashboard')
    
    if request.method == 'POST':
        form = CustomLoginForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            
            if user is not None:
                login(request, user)
                
                # Redirecionar baseado no role do usuário
                if hasattr(user, 'userprofile') and user.userprofile.role == 'admin':
                    messages.success(request, f'Bem-vindo, {user.username}! Você está na área administrativa.')
                    return redirect('admin_dashboard')
                else:
                    messages.success(request, f'Bem-vindo, {user.username}!')
                    return redirect('home')
            else:
                messages.error(request, 'Credenciais inválidas.')
    else:
        form = CustomLoginForm()
    
    return render(request, 'auth/login.html', {'form': form})


def custom_logout(request):
    """View personalizada de logout"""
    logout(request)
    messages.success(request, 'Você foi desconectado com sucesso.')
    return redirect('home')


class CustomRegisterView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'auth/register.html'
    success_url = reverse_lazy('login')
    
    def form_valid(self, form):
        response = super().form_valid(form)
        username = form.cleaned_data.get('username')
        role = form.cleaned_data.get('role')
        messages.success(self.request, f'Conta criada com sucesso para {username} como {role}!')
        return response


@login_required
def profile(request):
    """Perfil do usuário"""
    return render(request, 'auth/profile.html', {'user': request.user})
