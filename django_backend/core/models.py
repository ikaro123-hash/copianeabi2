from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from django.core.exceptions import ValidationError


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('reader', 'Leitor'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='reader')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nome")
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, verbose_name="Descrição")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50, verbose_name="Nome")
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Rascunho'),
        ('published', 'Publicado'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(unique=True)
    content = models.TextField(verbose_name="Conteúdo")
    excerpt = models.TextField(max_length=300, verbose_name="Resumo", blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Autor")
    image = models.ImageField(upload_to='posts/', blank=True, null=True, verbose_name="Imagem")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft', verbose_name="Status")
    publication_date = models.DateTimeField(verbose_name="Data de Publicação", default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="Categoria")
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="Tags")
    views = models.PositiveIntegerField(default=0, verbose_name="Visualizações")
    featured = models.BooleanField(default=False, verbose_name="Destaque")
    
    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        ordering = ['-publication_date']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('post_detail', kwargs={'slug': self.slug})
    
    @property
    def is_published(self):
        """Verifica se o post está publicado e dentro do período válido"""
        return (self.status == 'published' and 
                self.publication_date <= timezone.now())
    
    def save(self, *args, **kwargs):
        if not self.excerpt and self.content:
            # Gera excerpt automaticamente se não fornecido
            self.excerpt = self.content[:297] + "..."
        super().save(*args, **kwargs)


class Event(models.Model):
    VISIBILITY_CHOICES = [
        ('public', 'Público'),
        ('private', 'Privado'),
    ]
    
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
    
    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(unique=True)
    description = models.TextField(verbose_name="Descrição")
    start_date = models.DateTimeField(verbose_name="Data/Hora de Início")
    end_date = models.DateTimeField(verbose_name="Data/Hora de Fim")
    location = models.CharField(max_length=200, verbose_name="Local")
    visibility = models.CharField(max_length=10, choices=VISIBILITY_CHOICES, default='public', verbose_name="Visibilidade")
    event_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='presencial', verbose_name="Tipo do Evento")
    capacity = models.PositiveIntegerField(verbose_name="Capacidade", null=True, blank=True)
    registered = models.PositiveIntegerField(default=0, verbose_name="Inscritos")
    organizer = models.CharField(max_length=200, verbose_name="Organizador")
    speakers = models.TextField(help_text="Lista de palestrantes separados por vírgula", verbose_name="Palestrantes", blank=True)
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="Tags")
    image = models.ImageField(upload_to='events/', blank=True, null=True, verbose_name="Imagem")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming', verbose_name="Status")
    featured = models.BooleanField(default=False, verbose_name="Destaque")
    registration_required = models.BooleanField(default=True, verbose_name="Inscrição Obrigatória")
    price = models.CharField(max_length=50, default="Gratuito", verbose_name="Preço")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    
    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        ordering = ['start_date']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('event_detail', kwargs={'slug': self.slug})
    
    def clean(self):
        """Validação para garantir que a data final seja posterior à inicial"""
        if self.start_date and self.end_date:
            if self.end_date <= self.start_date:
                raise ValidationError('A data de fim deve ser posterior à data de início.')
    
    @property
    def is_upcoming(self):
        """Verifica se o evento ainda está por acontecer"""
        return self.start_date > timezone.now()
    
    @property
    def is_public_and_upcoming(self):
        """Verifica se o evento é público e ainda está por acontecer"""
        return self.visibility == 'public' and self.is_upcoming
    
    @property
    def speakers_list(self):
        """Retorna lista de palestrantes"""
        return [speaker.strip() for speaker in self.speakers.split(',') if speaker.strip()]
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nome")
    email = models.EmailField(verbose_name="Email")
    subject = models.CharField(max_length=200, verbose_name="Assunto")
    message = models.TextField(verbose_name="Mensagem")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    read = models.BooleanField(default=False, verbose_name="Lida")
    
    class Meta:
        verbose_name = "Mensagem de Contato"
        verbose_name_plural = "Mensagens de Contato"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
