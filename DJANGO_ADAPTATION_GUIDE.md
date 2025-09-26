# Guia de Adaptação para Django

Este projeto foi estruturado para ser facilmente adaptável para Django. Este guia mostra como migrar os componentes React para templates Django e configurar o backend.

## Estrutura do Projeto Django

```
neabi_django/
├── neabi/                          # Projeto principal
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── core/                           # App principal
│   ├── models.py                   # Modelos de dados
│   ├── views.py                    # Views baseadas em classe/função
│   ├── urls.py                     # URLs do app
│   ├── forms.py                    # Formulários Django
│   └── admin.py                    # Interface admin
├── templates/                      # Templates HTML
│   ├── base.html                   # Template base
│   ├── includes/                   # Componentes reutilizáveis
│   │   ├── navigation.html
│   │   ├── footer.html
│   │   ├── pagination.html
│   │   └── meta_tags.html
│   ├── pages/                      # Páginas principais
│   │   ├── home.html
│   │   ├── sobre.html
│   │   ├── projetos.html
│   │   ├── blog.html
│   │   ├── eventos.html
│   │   └── contato.html
│   └── components/                 # Componentes específicos
│       ├── blog_post_card.html
│       ├── event_card.html
│       └── search_filter.html
├── static/                         # Arquivos estáticos
│   ├── css/                        # CSS (pode usar Tailwind)
│   ├── js/                         # JavaScript
│   └── images/                     # Imagens
└── requirements.txt
```

## Modelos Django

### 1. Modelo para Posts do Blog

```python
# core/models.py
from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    author_role = models.CharField(max_length=100, blank=True)
    published_date = models.DateTimeField(auto_now_add=True)
    read_time = models.CharField(max_length=20, default="5 min")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag', blank=True)
    image = models.ImageField(upload_to='blog_images/', blank=True)
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog_detail', kwargs={'slug': self.slug})

class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Event(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Próximo'),
        ('ongoing', 'Em andamento'),
        ('completed', 'Finalizado'),
    ]

    TYPE_CHOICES = [
        ('presencial', 'Presencial'),
        ('online', 'Online'),
        ('hibrido', 'Híbrido'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    event_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='presencial')
    capacity = models.PositiveIntegerField()
    registered = models.PositiveIntegerField(default=0)
    organizer = models.CharField(max_length=200)
    speakers = models.TextField(help_text="Lista de palestrantes separados por vírgula")
    tags = models.ManyToManyField(Tag, blank=True)
    image = models.ImageField(upload_to='event_images/', blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    featured = models.BooleanField(default=False)
    registration_required = models.BooleanField(default=True)
    price = models.CharField(max_length=50, default="Gratuito")

    class Meta:
        ordering = ['date', 'start_time']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('event_detail', kwargs={'slug': self.slug})

    @property
    def speakers_list(self):
        return [speaker.strip() for speaker in self.speakers.split(',') if speaker.strip()]
```

### 2. Views Django

```python
# core/views.py
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.db.models import Q
from .models import BlogPost, Event, Category
from .forms import ContactForm

class BlogListView(ListView):
    model = BlogPost
    template_name = 'pages/blog.html'
    context_object_name = 'posts'
    paginate_by = 9

    def get_queryset(self):
        queryset = BlogPost.objects.all()
        search = self.request.GET.get('search')
        category = self.request.GET.get('category')

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(excerpt__icontains=search) |
                Q(author__first_name__icontains=search)
            )

        if category and category != 'Todos':
            queryset = queryset.filter(category__name=category)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = ['Todos'] + list(Category.objects.values_list('name', flat=True))
        context['featured_posts'] = BlogPost.objects.filter(featured=True)[:3]
        return context

def home_view(request):
    featured_events = Event.objects.filter(featured=True)[:2]
    recent_posts = BlogPost.objects.all()[:3]

    context = {
        'featured_events': featured_events,
        'recent_posts': recent_posts,
    }
    return render(request, 'pages/home.html', context)

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Processar formulário
            form.save()
            messages.success(request, 'Mensagem enviada com sucesso!')
            return redirect('contact')
    else:
        form = ContactForm()

    return render(request, 'pages/contato.html', {'form': form})
```

### 3. Templates Base

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    {% include 'includes/meta_tags.html' %}

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Configuração do Tailwind personalizada -->
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              amber: {
                50: "#fffbeb",
                600: "#d97706",
                700: "#b45309",
              },
              red: {
                700: "#b91c1c",
              },
            },
          },
        },
      };
    </script>

    {% load static %}
    <link rel="stylesheet" href="{% static 'css/custom.css' %}" />
  </head>
  <body class="min-h-screen bg-gradient-to-b from-amber-50 to-white">
    {% include 'includes/navigation.html' %}

    <main>{% block content %} {% endblock %}</main>

    {% include 'includes/footer.html' %}

    <script src="{% static 'js/main.js' %}"></script>
  </body>
</html>
```

### 4. Template de Blog

```html
<!-- templates/pages/blog.html -->
{% extends 'base.html' %} {% load static %} {% block content %}
<!-- Hero Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <span
        class="inline-block mb-4 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
        >Blog NEABI</span
      >
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Reflexões sobre
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700"
          >Diversidade</span
        >
      </h1>
      <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        Artigos, pesquisas e discussões sobre questões étnico-raciais,
        diversidade cultural e inclusão no ambiente acadêmico e na sociedade
        brasileira.
      </p>
    </div>
  </div>
</section>

<!-- Posts em Destaque -->
{% if featured_posts %}
<section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Posts em Destaque</h2>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      {% for post in featured_posts %} {% include
      'components/blog_post_card.html' with post=post featured=True %} {% endfor
      %}
    </div>
  </div>
</section>
{% endif %}

<!-- Filtros -->
<section class="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    {% include 'components/search_filter.html' %}
  </div>
</section>

<!-- Posts Grid -->
<section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900">
        Todos os Artigos
        <span class="text-sm font-normal text-gray-500 ml-2">
          ({{ paginator.count }} {% if paginator.count == 1 %}artigo{% else
          %}artigos{% endif %})
        </span>
      </h2>
    </div>

    <!-- Grid 3x3 de Posts -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {% for post in posts %} {% include 'components/blog_post_card.html' %} {%
      empty %}
      <div class="col-span-3 text-center py-12">
        <p class="text-gray-500">Nenhum post encontrado.</p>
      </div>
      {% endfor %}
    </div>

    <!-- Paginação -->
    {% if is_paginated %} {% include 'includes/pagination.html' %} {% endif %}
  </div>
</section>
{% endblock %}
```

### 5. Componente de Card do Blog

```html
<!-- templates/components/blog_post_card.html -->
<article
  class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
>
  <div
    class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden"
  >
    {% if post.image %}
    <img
      src="{{ post.image.url }}"
      alt="{{ post.title }}"
      class="w-full h-full object-cover"
    />
    {% else %}
    <div
      class="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center"
    >
      <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
      </svg>
    </div>
    {% endif %} {% if featured %}
    <span
      class="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs"
      >Destaque</span
    >
    {% endif %}
  </div>

  <div class="p-6">
    <div class="flex justify-between items-start mb-2">
      <span
        class="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
        >{{ post.category.name }}</span
      >
      <div class="flex items-center gap-3 text-xs text-gray-500">
        <div class="flex items-center gap-1">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {{ post.views|floatformat:0 }}
        </div>
        <div class="flex items-center gap-1">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {{ post.likes }}
        </div>
      </div>
    </div>

    <h3
      class="text-lg font-semibold leading-tight hover:text-amber-600 transition-colors mb-2"
    >
      <a href="{{ post.get_absolute_url }}">{{ post.title }}</a>
    </h3>

    <p class="text-sm text-gray-600 mb-2">
      Por {{ post.author.get_full_name|default:post.author.username }} • {{
      post.published_date|date:"d \de F \de Y" }}
    </p>

    <p class="text-gray-600 mb-4 text-sm">
      {{ post.excerpt|truncatewords:20 }}
    </p>

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {{ post.read_time }}
      </div>
      <a
        href="{{ post.get_absolute_url }}"
        class="text-amber-600 hover:text-amber-700 text-xs font-medium"
      >
        Ler mais →
      </a>
    </div>
  </div>
</article>
```

### 6. URLs

```python
# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('sobre/', views.sobre_view, name='sobre'),
    path('projetos/', views.projetos_view, name='projetos'),
    path('projetos/semana-consciencia-negra/', views.semana_consciencia_negra_view, name='semana_consciencia_negra'),
    path('projetos/eventos/', views.EventListView.as_view(), name='eventos'),
    path('blog/', views.BlogListView.as_view(), name='blog'),
    path('blog/<slug:slug>/', views.BlogDetailView.as_view(), name='blog_detail'),
    path('eventos/<slug:slug>/', views.EventDetailView.as_view(), name='event_detail'),
    path('contato/', views.contact_view, name='contato'),
]
```

## Adaptações Necessárias

### 1. CSS e JavaScript

- Manter Tailwind CSS para consistência visual
- Adicionar JavaScript para interatividade (filtros, paginação AJAX)

### 2. Formulários

- Converter formulários React para Django Forms
- Adicionar validação e proteção CSRF

### 3. Paginação

- Usar Django Paginator para paginar posts e eventos
- Implementar AJAX para navegação sem reload

### 4. Search e Filtros

- Implementar busca com Django ORM
- Usar QuerySets para filtros eficientes

### 5. SEO

- Adicionar meta tags dinâmicas
- Implementar sitemap.xml
- Configurar URLs amigáveis

## Comandos de Instalação

```bash
# Criar projeto Django
django-admin startproject neabi_django
cd neabi_django
python manage.py startapp core

# Instalar dependências
pip install django pillow django-crispy-forms

# Configurar banco de dados
python manage.py makemigrations
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Executar servidor
python manage.py runserver
```

## Considerações Finais

Esta estrutura mantém a funcionalidade e design do projeto React while aproveitando os recursos robustos do Django para:

- Administração de conteúdo
- Autenticação e autorização
- ORM para banco de dados
- Sistema de templates
- Proteção contra vulnerabilidades
- Escalabilidade

O código React serve como excelente protótipo para entender a estrutura e comportamento desejados antes da implementação em Django.
