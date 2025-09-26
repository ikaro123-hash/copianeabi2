from django.db import models
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from django.utils.text import slugify
from django.utils import timezone


class User(AbstractUser):
    """Extended user model with role-based permissions"""
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('reader', 'Leitor'),
    ]
    
    role = models.CharField(
        max_length=10, 
        choices=ROLE_CHOICES, 
        default='reader',
        verbose_name='Função'
    )
    first_name = models.CharField(max_length=150, verbose_name='Nome')
    last_name = models.CharField(max_length=150, verbose_name='Sobrenome')
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def is_admin(self):
        return self.role == 'admin'


class Category(models.Model):
    """Categories for blog posts and events"""
    name = models.CharField(max_length=100, unique=True, verbose_name='Nome')
    slug = models.SlugField(unique=True, verbose_name='URL')
    description = models.TextField(blank=True, verbose_name='Descrição')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['name']

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Tag(models.Model):
    """Tags for blog posts and events"""
    name = models.CharField(max_length=50, unique=True, verbose_name='Nome')
    slug = models.SlugField(unique=True, verbose_name='URL')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')

    class Meta:
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'
        ordering = ['name']

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(models.Model):
    """Blog post model"""
    STATUS_CHOICES = [
        ('draft', 'Rascunho'),
        ('published', 'Publicado'),
        ('archived', 'Arquivado'),
    ]

    title = models.CharField(max_length=200, verbose_name='Título')
    slug = models.SlugField(unique=True, verbose_name='URL')
    excerpt = models.TextField(max_length=300, verbose_name='Resumo')
    content = models.TextField(verbose_name='Conteúdo')
    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        verbose_name='Autor'
    )
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        verbose_name='Categoria'
    )
    tags = models.ManyToManyField(Tag, blank=True, verbose_name='Tags')
    published_date = models.DateTimeField(default=timezone.now, verbose_name='Data de publicação')
    read_time = models.CharField(max_length=20, default='5 min', verbose_name='Tempo de leitura')
    image = models.ImageField(
        upload_to='blog_images/', 
        blank=True, 
        null=True, 
        verbose_name='Imagem'
    )
    views = models.PositiveIntegerField(default=0, verbose_name='Visualizações')
    likes = models.PositiveIntegerField(default=0, verbose_name='Curtidas')
    featured = models.BooleanField(default=False, verbose_name='Destaque')
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='published',
        verbose_name='Status'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')

    class Meta:
        verbose_name = 'Post do Blog'
        verbose_name_plural = 'Posts do Blog'
        ordering = ['-published_date']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog_detail', kwargs={'slug': self.slug})
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_tags_list(self):
        return list(self.tags.values_list('name', flat=True))


class Event(models.Model):
    """Event model"""
    STATUS_CHOICES = [
        ('upcoming', 'Próximo'),
        ('ongoing', 'Em andamento'),
        ('completed', 'Finalizado'),
        ('cancelled', 'Cancelado'),
    ]

    TYPE_CHOICES = [
        ('presencial', 'Presencial'),
        ('online', 'Online'),
        ('hibrido', 'Híbrido'),
    ]

    title = models.CharField(max_length=200, verbose_name='Título')
    slug = models.SlugField(unique=True, verbose_name='URL')
    description = models.TextField(verbose_name='Descrição')
    date = models.DateField(verbose_name='Data')
    start_time = models.TimeField(verbose_name='Hora de início')
    end_time = models.TimeField(verbose_name='Hora de término')
    location = models.CharField(max_length=200, verbose_name='Local')
    category = models.CharField(max_length=100, verbose_name='Categoria')
    event_type = models.CharField(
        max_length=20, 
        choices=TYPE_CHOICES, 
        default='presencial',
        verbose_name='Tipo de evento'
    )
    capacity = models.PositiveIntegerField(verbose_name='Capacidade')
    registered = models.PositiveIntegerField(default=0, verbose_name='Inscritos')
    organizer = models.CharField(max_length=200, verbose_name='Organizador')
    speakers = models.TextField(
        blank=True, 
        help_text="Lista de palestrantes separados por vírgula",
        verbose_name='Palestrantes'
    )
    tags = models.ManyToManyField(Tag, blank=True, verbose_name='Tags')
    image = models.ImageField(
        upload_to='event_images/', 
        blank=True, 
        null=True, 
        verbose_name='Imagem'
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='upcoming',
        verbose_name='Status'
    )
    featured = models.BooleanField(default=False, verbose_name='Destaque')
    registration_required = models.BooleanField(default=True, verbose_name='Inscrição obrigatória')
    price = models.CharField(max_length=50, default="Gratuito", verbose_name='Preço')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')

    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'
        ordering = ['date', 'start_time']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('event_detail', kwargs={'slug': self.slug})
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_speakers_list(self):
        """Return list of speakers"""
        if self.speakers:
            return [speaker.strip() for speaker in self.speakers.split(',') if speaker.strip()]
        return []
    
    def is_full(self):
        """Check if event is at capacity"""
        return self.registered >= self.capacity
    
    def spots_remaining(self):
        """Calculate remaining spots"""
        return max(0, self.capacity - self.registered)


class ContactMessage(models.Model):
    """Contact form messages"""
    name = models.CharField(max_length=100, verbose_name='Nome')
    email = models.EmailField(verbose_name='Email')
    subject = models.CharField(max_length=200, verbose_name='Assunto')
    message = models.TextField(verbose_name='Mensagem')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Enviado em')
    is_read = models.BooleanField(default=False, verbose_name='Lida')

    class Meta:
        verbose_name = 'Mensagem de Contato'
        verbose_name_plural = 'Mensagens de Contato'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"
