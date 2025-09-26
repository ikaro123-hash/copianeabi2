from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import api_views

router = DefaultRouter()
router.register(r'posts', api_views.PostViewSet, basename='post')
router.register(r'events', api_views.EventViewSet, basename='event')
router.register(r'categories', api_views.CategoryViewSet)
router.register(r'tags', api_views.TagViewSet)
router.register(r'contact-messages', api_views.ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
]
