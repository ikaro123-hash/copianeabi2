from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field, Submit, Div, HTML
from crispy_forms.bootstrap import FormActions
from .models import User, BlogPost, Event, ContactMessage, Category, Tag


class NEABIAuthenticationForm(AuthenticationForm):
    """Custom login form with NEABI styling"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Field('username', placeholder='Email ou nome de usuário'),
            Field('password', placeholder='Senha'),
            FormActions(
                Submit('submit', 'Entrar', css_class='btn btn-primary w-100')
            )
        )


class ContactForm(forms.ModelForm):
    """Contact form for the website"""
    
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Seu nome completo'}),
            'email': forms.EmailInput(attrs={'placeholder': 'seu@email.com'}),
            'subject': forms.TextInput(attrs={'placeholder': 'Assunto da mensagem'}),
            'message': forms.Textarea(attrs={
                'placeholder': 'Escreva sua mensagem aqui...',
                'rows': 6
            }),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Div(
                Div('name', css_class='col-md-6'),
                Div('email', css_class='col-md-6'),
                css_class='row'
            ),
            Field('subject'),
            Field('message'),
            FormActions(
                Submit('submit', 'Enviar Mensagem', css_class='btn btn-primary')
            )
        )


class BlogPostForm(forms.ModelForm):
    """Form for creating and editing blog posts"""
    
    class Meta:
        model = BlogPost
        fields = [
            'title', 'excerpt', 'content', 'category', 'tags', 
            'read_time', 'image', 'featured', 'status'
        ]
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Título do post'}),
            'excerpt': forms.Textarea(attrs={
                'placeholder': 'Resumo do post (máximo 300 caracteres)',
                'rows': 3
            }),
            'content': forms.Textarea(attrs={
                'placeholder': 'Conteúdo completo do post',
                'rows': 15
            }),
            'read_time': forms.TextInput(attrs={'placeholder': '5 min'}),
            'tags': forms.CheckboxSelectMultiple(),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_enctype = 'multipart/form-data'
        self.helper.layout = Layout(
            HTML('<h4>Informações Básicas</h4>'),
            Field('title'),
            Field('excerpt'),
            Field('content'),
            HTML('<hr><h4>Metadados</h4>'),
            Div(
                Div('category', css_class='col-md-6'),
                Div('read_time', css_class='col-md-6'),
                css_class='row'
            ),
            Field('tags'),
            HTML('<hr><h4>Publicação</h4>'),
            Div(
                Div('status', css_class='col-md-6'),
                Div('featured', css_class='col-md-6'),
                css_class='row'
            ),
            Field('image'),
            FormActions(
                Submit('submit', 'Salvar Post', css_class='btn btn-primary'),
                HTML('<a href="{% url \'admin_posts\' %}" class="btn btn-secondary">Cancelar</a>')
            )
        )


class EventForm(forms.ModelForm):
    """Form for creating and editing events"""
    
    class Meta:
        model = Event
        fields = [
            'title', 'description', 'date', 'start_time', 'end_time',
            'location', 'category', 'event_type', 'capacity', 'organizer',
            'speakers', 'tags', 'image', 'registration_required', 'price',
            'featured', 'status'
        ]
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Título do evento'}),
            'description': forms.Textarea(attrs={
                'placeholder': 'Descrição detalhada do evento',
                'rows': 6
            }),
            'date': forms.DateInput(attrs={'type': 'date'}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
            'location': forms.TextInput(attrs={'placeholder': 'Local do evento'}),
            'category': forms.TextInput(attrs={'placeholder': 'Categoria do evento'}),
            'organizer': forms.TextInput(attrs={'placeholder': 'Nome do organizador'}),
            'speakers': forms.Textarea(attrs={
                'placeholder': 'Lista de palestrantes separados por vírgula',
                'rows': 3
            }),
            'price': forms.TextInput(attrs={'placeholder': 'Gratuito'}),
            'tags': forms.CheckboxSelectMultiple(),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_enctype = 'multipart/form-data'
        self.helper.layout = Layout(
            HTML('<h4>Informações Básicas</h4>'),
            Field('title'),
            Field('description'),
            HTML('<hr><h4>Data e Horário</h4>'),
            Div(
                Div('date', css_class='col-md-4'),
                Div('start_time', css_class='col-md-4'),
                Div('end_time', css_class='col-md-4'),
                css_class='row'
            ),
            HTML('<hr><h4>Local e Tipo</h4>'),
            Div(
                Div('location', css_class='col-md-6'),
                Div('event_type', css_class='col-md-6'),
                css_class='row'
            ),
            Div(
                Div('category', css_class='col-md-6'),
                Div('capacity', css_class='col-md-6'),
                css_class='row'
            ),
            HTML('<hr><h4>Organização</h4>'),
            Field('organizer'),
            Field('speakers'),
            Field('tags'),
            HTML('<hr><h4>Inscrições e Preço</h4>'),
            Div(
                Div('registration_required', css_class='col-md-6'),
                Div('price', css_class='col-md-6'),
                css_class='row'
            ),
            HTML('<hr><h4>Status</h4>'),
            Div(
                Div('status', css_class='col-md-6'),
                Div('featured', css_class='col-md-6'),
                css_class='row'
            ),
            Field('image'),
            FormActions(
                Submit('submit', 'Salvar Evento', css_class='btn btn-primary'),
                HTML('<a href="{% url \'admin_events\' %}" class="btn btn-secondary">Cancelar</a>')
            )
        )


class UserRegistrationForm(UserCreationForm):
    """Form for registering new users (admin only)"""
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'role', 'password1', 'password2']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            HTML('<h4>Informações do Usuário</h4>'),
            Div(
                Div('first_name', css_class='col-md-6'),
                Div('last_name', css_class='col-md-6'),
                css_class='row'
            ),
            Div(
                Div('username', css_class='col-md-6'),
                Div('email', css_class='col-md-6'),
                css_class='row'
            ),
            Field('role'),
            HTML('<hr><h4>Senha</h4>'),
            Field('password1'),
            Field('password2'),
            FormActions(
                Submit('submit', 'Criar Usuário', css_class='btn btn-primary'),
                HTML('<a href="{% url \'admin_dashboard\' %}" class="btn btn-secondary">Cancelar</a>')
            )
        )


class SearchForm(forms.Form):
    """Search form for posts and events"""
    search = forms.CharField(
        max_length=200,
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Buscar...',
            'class': 'form-control'
        })
    )
    category = forms.ModelChoiceField(
        queryset=Category.objects.all(),
        required=False,
        empty_label="Todas as categorias",
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'get'
        self.helper.layout = Layout(
            Div(
                Div('search', css_class='col-md-8'),
                Div('category', css_class='col-md-4'),
                css_class='row align-items-end'
            ),
            FormActions(
                Submit('submit', 'Buscar', css_class='btn btn-primary')
            )
        )
