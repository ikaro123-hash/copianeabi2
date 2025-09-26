from django.urls import path
from . import admin_views

urlpatterns = [
    path('', admin_views.admin_dashboard, name='admin_dashboard'),
    
    # Posts
    path('posts/', admin_views.AdminPostListView.as_view(), name='admin_post_list'),
    path('posts/create/', admin_views.AdminPostCreateView.as_view(), name='admin_post_create'),
    path('posts/<int:pk>/edit/', admin_views.AdminPostUpdateView.as_view(), name='admin_post_edit'),
    path('posts/<int:pk>/delete/', admin_views.AdminPostDeleteView.as_view(), name='admin_post_delete'),
    
    # Events
    path('events/', admin_views.AdminEventListView.as_view(), name='admin_event_list'),
    path('events/create/', admin_views.AdminEventCreateView.as_view(), name='admin_event_create'),
    path('events/<int:pk>/edit/', admin_views.AdminEventUpdateView.as_view(), name='admin_event_edit'),
    path('events/<int:pk>/delete/', admin_views.AdminEventDeleteView.as_view(), name='admin_event_delete'),
    
    # Messages
    path('messages/', admin_views.admin_messages, name='admin_messages'),
    path('messages/<int:pk>/', admin_views.admin_message_detail, name='admin_message_detail'),
    
    # Categories and Tags
    path('categories/', admin_views.admin_categories, name='admin_categories'),
    path('tags/', admin_views.admin_tags, name='admin_tags'),
]
