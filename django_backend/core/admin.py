from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile, Category, Tag, Post, Event, ContactMessage


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Perfis de Usuário'


class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'status', 'publication_date', 'featured', 'views']
    list_filter = ['status', 'featured', 'category', 'publication_date']
    search_fields = ['title', 'content', 'author__username']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    date_hierarchy = 'publication_date'
    
    fieldsets = (
        ('Conteúdo', {
            'fields': ('title', 'slug', 'content', 'excerpt', 'image')
        }),
        ('Publicação', {
            'fields': ('author', 'status', 'publication_date', 'category', 'tags')
        }),
        ('Configurações', {
            'fields': ('featured', 'views')
        }),
    )


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'start_date', 'end_date', 'visibility', 'status', 'featured']
    list_filter = ['visibility', 'status', 'event_type', 'featured', 'start_date']
    search_fields = ['title', 'description', 'organizer']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    date_hierarchy = 'start_date'
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'slug', 'description', 'image')
        }),
        ('Data e Local', {
            'fields': ('start_date', 'end_date', 'location', 'event_type')
        }),
        ('Configurações', {
            'fields': ('visibility', 'status', 'featured', 'registration_required', 'price')
        }),
        ('Detalhes', {
            'fields': ('organizer', 'speakers', 'capacity', 'registered', 'tags')
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'read']
    list_filter = ['read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
