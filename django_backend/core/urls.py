from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('sobre/', views.sobre, name='sobre'),
    path('projetos/', views.projetos, name='projetos'),
    path('projetos/semana-consciencia-negra/', views.semana_consciencia_negra, name='semana_consciencia_negra'),
    path('blog/', views.PostListView.as_view(), name='blog'),
    path('blog/<slug:slug>/', views.PostDetailView.as_view(), name='post_detail'),
    path('eventos/', views.EventListView.as_view(), name='eventos'),
    path('eventos/<slug:slug>/', views.EventDetailView.as_view(), name='event_detail'),
    path('contato/', views.contato, name='contato'),
]
