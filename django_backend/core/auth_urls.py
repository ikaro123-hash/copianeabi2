from django.urls import path
from . import auth_views

urlpatterns = [
    path('login/', auth_views.custom_login, name='login'),
    path('logout/', auth_views.custom_logout, name='logout'),
    path('register/', auth_views.CustomRegisterView.as_view(), name='register'),
    path('profile/', auth_views.profile, name='profile'),
]
