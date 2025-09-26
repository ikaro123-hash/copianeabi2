from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.db.models import Q
from django.contrib import messages
from django.views.generic import ListView, DetailView
from django.utils import timezone
from .models import Post, Event, Category, Tag
from .forms import ContactForm


def home(request):
    """Página inicial"""
    featured_posts = Post.objects.filter(
        status='published',
        featured=True,
        publication_date__lte=timezone.now()
    )[:3]
    
    upcoming_events = Event.objects.filter(
        visibility='public',
        start_date__gt=timezone.now()
    )[:3]
    
    context = {
        'featured_posts': featured_posts,
        'upcoming_events': upcoming_events,
    }
    return render(request, 'pages/home.html', context)


class PostListView(ListView):
    model = Post
    template_name = 'pages/blog.html'
    context_object_name = 'posts'
    paginate_by = 9
    
    def get_queryset(self):
        # Apenas posts publicados e dentro do período válido
        queryset = Post.objects.filter(
            status='published',
            publication_date__lte=timezone.now()
        )
        
        search = self.request.GET.get('search')
        category = self.request.GET.get('category')
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(excerpt__icontains=search) |
                Q(content__icontains=search) |
                Q(author__first_name__icontains=search) |
                Q(author__last_name__icontains=search)
            )
        
        if category and category != 'Todos':
            queryset = queryset.filter(category__name=category)
        
        return queryset.order_by('-publication_date')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = ['Todos'] + list(
            Category.objects.values_list('name', flat=True)
        )
        context['featured_posts'] = Post.objects.filter(
            status='published',
            featured=True,
            publication_date__lte=timezone.now()
        )[:3]
        return context


class PostDetailView(DetailView):
    model = Post
    template_name = 'pages/post_detail.html'
    context_object_name = 'post'
    slug_field = 'slug'
    slug_url_kwarg = 'slug'
    
    def get_queryset(self):
        # Apenas posts publicados
        return Post.objects.filter(
            status='published',
            publication_date__lte=timezone.now()
        )
    
    def get_object(self, queryset=None):
        obj = super().get_object(queryset)
        # Incrementar visualizações
        obj.views += 1
        obj.save(update_fields=['views'])
        return obj


class EventListView(ListView):
    model = Event
    template_name = 'pages/eventos.html'
    context_object_name = 'events'
    paginate_by = 12
    
    def get_queryset(self):
        # Apenas eventos públicos e futuros
        return Event.objects.filter(
            visibility='public',
            start_date__gt=timezone.now()
        ).order_by('start_date')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['featured_events'] = Event.objects.filter(
            visibility='public',
            featured=True,
            start_date__gt=timezone.now()
        )[:2]
        return context


class EventDetailView(DetailView):
    model = Event
    template_name = 'pages/event_detail.html'
    context_object_name = 'event'
    slug_field = 'slug'
    slug_url_kwarg = 'slug'
    
    def get_queryset(self):
        # Apenas eventos públicos
        return Event.objects.filter(
            visibility='public',
            start_date__gt=timezone.now()
        )


def sobre(request):
    """Página sobre o NEABI"""
    return render(request, 'pages/sobre.html')


def projetos(request):
    """Página de projetos"""
    return render(request, 'pages/projetos.html')


def semana_consciencia_negra(request):
    """Página da Semana da Consciência Negra"""
    return render(request, 'pages/semana_consciencia_negra.html')


def contato(request):
    """Página de contato"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Mensagem enviada com sucesso! Em breve entraremos em contato.')
            return redirect('contato')
    else:
        form = ContactForm()
    
    return render(request, 'pages/contato.html', {'form': form})
