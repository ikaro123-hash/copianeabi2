from django.urls import path
from . import views

urlpatterns = [
    # Public pages
    path('', views.home_view, name='home'),
    path('sobre/', views.sobre_view, name='sobre'),
    path('projetos/', views.projetos_view, name='projetos'),
    path('projetos/semana-consciencia-negra/', views.semana_consciencia_negra_view, name='semana_consciencia_negra'),
    path('contato/', views.contact_view, name='contato'),
    
    # Blog
    path('blog/', views.BlogListView.as_view(), name='blog'),
    path('blog/<slug:slug>/', views.BlogDetailView.as_view(), name='blog_detail'),
    
    # Events
    path('projetos/eventos/', views.EventListView.as_view(), name='eventos'),
    path('evento/<slug:slug>/', views.EventDetailView.as_view(), name='event_detail'),
    path('evento/<slug:slug>/inscrever/', views.event_register, name='event_register'),
    
    # Authentication
    path('admin/login/', views.admin_login_view, name='admin_login'),
    path('admin/logout/', views.admin_logout_view, name='admin_logout'),
    
    # Admin dashboard
    path('admin/dashboard/', views.admin_dashboard_view, name='admin_dashboard'),
    
    # Admin posts
    path('admin/posts/', views.AdminPostListView.as_view(), name='admin_posts'),
    path('admin/posts/new/', views.AdminPostCreateView.as_view(), name='admin_post_create'),
    path('admin/posts/<int:pk>/edit/', views.AdminPostUpdateView.as_view(), name='admin_post_edit'),
    path('admin/posts/<int:pk>/delete/', views.AdminPostDeleteView.as_view(), name='admin_post_delete'),
    
    # Admin events
    path('admin/events/', views.AdminEventListView.as_view(), name='admin_events'),
    path('admin/events/new/', views.AdminEventCreateView.as_view(), name='admin_event_create'),
    path('admin/events/<int:pk>/edit/', views.AdminEventUpdateView.as_view(), name='admin_event_edit'),
    path('admin/events/<int:pk>/delete/', views.AdminEventDeleteView.as_view(), name='admin_event_delete'),
    
    # Admin messages
    path('admin/messages/', views.admin_messages_view, name='admin_messages'),
    path('admin/messages/<int:message_id>/read/', views.mark_message_read, name='mark_message_read'),
]
