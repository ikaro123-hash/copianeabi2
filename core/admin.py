from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import User, Category, Tag, BlogPost, Event, ContactMessage


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'date_joined')
    list_filter = ('role', 'is_active', 'is_staff', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Informações NEABI', {'fields': ('role',)}),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Informações NEABI', {'fields': ('role',)}),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = (
        'title', 
        'author', 
        'category', 
        'status', 
        'featured', 
        'views', 
        'published_date'
    )
    list_filter = ('status', 'featured', 'category', 'published_date', 'author')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    date_hierarchy = 'published_date'
    ordering = ('-published_date',)
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'slug', 'excerpt', 'content')
        }),
        ('Metadados', {
            'fields': ('author', 'category', 'tags', 'read_time')
        }),
        ('Publicação', {
            'fields': ('status', 'featured', 'published_date')
        }),
        ('Mídia', {
            'fields': ('image',)
        }),
        ('Estatísticas', {
            'fields': ('views', 'likes'),
            'classes': ('collapse',)
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # If creating new post
            obj.author = request.user
        super().save_model(request, obj, form, change)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        'title', 
        'date', 
        'start_time', 
        'event_type', 
        'status', 
        'featured',
        'registered_capacity',
        'organizer'
    )
    list_filter = ('status', 'event_type', 'featured', 'date', 'category')
    search_fields = ('title', 'description', 'location', 'organizer')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    date_hierarchy = 'date'
    ordering = ('-date',)
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'slug', 'description')
        }),
        ('Data e Horário', {
            'fields': ('date', 'start_time', 'end_time')
        }),
        ('Local e Tipo', {
            'fields': ('location', 'event_type', 'category')
        }),
        ('Organização', {
            'fields': ('organizer', 'speakers', 'tags')
        }),
        ('Inscrições', {
            'fields': ('capacity', 'registered', 'registration_required', 'price')
        }),
        ('Status e Destaque', {
            'fields': ('status', 'featured')
        }),
        ('Mídia', {
            'fields': ('image',)
        }),
    )
    
    def registered_capacity(self, obj):
        percentage = (obj.registered / obj.capacity) * 100 if obj.capacity > 0 else 0
        color = 'red' if percentage >= 100 else 'orange' if percentage >= 80 else 'green'
        return format_html(
            '<span style="color: {};">{}/{} ({}%)</span>',
            color, obj.registered, obj.capacity, round(percentage, 1)
        )
    registered_capacity.short_description = 'Inscritos/Capacidade'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    ordering = ('-created_at',)
    
    def has_add_permission(self, request):
        return False  # Prevent adding through admin
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
        self.message_user(request, f'{queryset.count()} mensagens marcadas como lidas.')
    mark_as_read.short_description = 'Marcar como lida'
    
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
        self.message_user(request, f'{queryset.count()} mensagens marcadas como não lidas.')
    mark_as_unread.short_description = 'Marcar como não lida'


# Customize admin site
admin.site.site_header = 'NEABI - Administração'
admin.site.site_title = 'NEABI Admin'
admin.site.index_title = 'Painel Administrativo NEABI'
