from functools import wraps
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseForbidden


def admin_required(view_func):
    """Decorator que permite acesso apenas para usuários admin"""
    @wraps(view_func)
    @login_required
    def wrapper(request, *args, **kwargs):
        if not hasattr(request.user, 'userprofile') or request.user.userprofile.role != 'admin':
            messages.error(request, 'Acesso negado. Você precisa ser um administrador para acessar esta área.')
            return redirect('home')
        return view_func(request, *args, **kwargs)
    return wrapper


def reader_or_admin_required(view_func):
    """Decorator que permite acesso para usuários reader ou admin"""
    @wraps(view_func)
    @login_required
    def wrapper(request, *args, **kwargs):
        if not hasattr(request.user, 'userprofile'):
            messages.error(request, 'Perfil de usuário não encontrado.')
            return redirect('home')
        return view_func(request, *args, **kwargs)
    return wrapper


class AdminRequiredMixin:
    """Mixin para views baseadas em classe que requer acesso de admin"""
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        
        if not hasattr(request.user, 'userprofile') or request.user.userprofile.role != 'admin':
            messages.error(request, 'Acesso negado. Você precisa ser um administrador para acessar esta área.')
            return redirect('home')
        
        return super().dispatch(request, *args, **kwargs)


class ReaderOrAdminRequiredMixin:
    """Mixin para views baseadas em classe que requer acesso de reader ou admin"""
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        
        if not hasattr(request.user, 'userprofile'):
            messages.error(request, 'Perfil de usu��rio não encontrado.')
            return redirect('home')
        
        return super().dispatch(request, *args, **kwargs)
