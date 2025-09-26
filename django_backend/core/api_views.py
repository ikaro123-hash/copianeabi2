from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from .models import Post, Event, Category, Tag, ContactMessage
from .serializers import (
    PostSerializer, PostListSerializer, EventSerializer, EventListSerializer,
    CategorySerializer, TagSerializer, ContactMessageSerializer
)


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permissão personalizada que permite apenas leitura para todos
    e escrita apenas para administradores.
    """
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return (request.user.is_authenticated and 
                hasattr(request.user, 'userprofile') and 
                request.user.userprofile.role == 'admin')


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    
    def get_queryset(self):
        queryset = Post.objects.all()
        
        # Para usuários não-admin, mostrar apenas posts publicados
        if not (self.request.user.is_authenticated and 
                hasattr(self.request.user, 'userprofile') and 
                self.request.user.userprofile.role == 'admin'):
            queryset = queryset.filter(
                status='published',
                publication_date__lte=timezone.now()
            )
        
        # Filtros
        search = self.request.query_params.get('search', None)
        category = self.request.query_params.get('category', None)
        status_filter = self.request.query_params.get('status', None)
        featured = self.request.query_params.get('featured', None)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(content__icontains=search) |
                Q(excerpt__icontains=search)
            )
        
        if category:
            queryset = queryset.filter(category__name=category)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        if featured:
            queryset = queryset.filter(featured=True)
        
        return queryset.order_by('-publication_date')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        return PostSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Endpoint para posts em destaque"""
        featured_posts = self.get_queryset().filter(featured=True)[:3]
        serializer = PostListSerializer(featured_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """Incrementar visualizações de um post"""
        post = self.get_object()
        post.views += 1
        post.save(update_fields=['views'])
        return Response({'views': post.views})


class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    
    def get_queryset(self):
        queryset = Event.objects.all()
        
        # Para usuários não-admin, mostrar apenas eventos públicos e futuros
        if not (self.request.user.is_authenticated and 
                hasattr(self.request.user, 'userprofile') and 
                self.request.user.userprofile.role == 'admin'):
            queryset = queryset.filter(
                visibility='public',
                start_date__gt=timezone.now()
            )
        
        # Filtros
        search = self.request.query_params.get('search', None)
        visibility = self.request.query_params.get('visibility', None)
        status_filter = self.request.query_params.get('status', None)
        featured = self.request.query_params.get('featured', None)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search) |
                Q(organizer__icontains=search)
            )
        
        if visibility:
            queryset = queryset.filter(visibility=visibility)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        if featured:
            queryset = queryset.filter(featured=True)
        
        return queryset.order_by('start_date')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return EventListSerializer
        return EventSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Endpoint para eventos em destaque"""
        featured_events = self.get_queryset().filter(featured=True)[:2]
        serializer = EventListSerializer(featured_events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Endpoint para eventos próximos"""
        upcoming_events = self.get_queryset().filter(
            start_date__gt=timezone.now()
        )[:5]
        serializer = EventListSerializer(upcoming_events, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsAdminOrReadOnly]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        """Permitir que qualquer pessoa envie mensagem de contato"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Mensagem enviada com sucesso!'}, 
            status=status.HTTP_201_CREATED
        )
