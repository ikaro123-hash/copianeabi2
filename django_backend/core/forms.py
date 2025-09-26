from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Field
from .models import Post, Event, ContactMessage, UserProfile


class CustomLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Field('username', css_class='mb-4'),
            Field('password', css_class='mb-4'),
            Submit('submit', 'Entrar', css_class='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded')
        )
        self.fields['username'].widget.attrs.update({
            'class': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500',
            'placeholder': 'Nome de usuário'
        })
        self.fields['password'].widget.attrs.update({
            'class': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500',
            'placeholder': 'Senha'
        })


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    role = forms.ChoiceField(choices=UserProfile.ROLE_CHOICES, initial='reader')
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'role')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Field('username', css_class='mb-4'),
            Field('email', css_class='mb-4'),
            Field('password1', css_class='mb-4'),
            Field('password2', css_class='mb-4'),
            Field('role', css_class='mb-4'),
            Submit('submit', 'Registrar', css_class='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded')
        )
        
        for field in self.fields.values():
            field.widget.attrs.update({
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
            })
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
            user.userprofile.role = self.cleaned_data['role']
            user.userprofile.save()
        return user


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'excerpt', 'image', 'status', 'publication_date', 'category', 'tags', 'featured']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 10}),
            'excerpt': forms.Textarea(attrs={'rows': 3}),
            'publication_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'tags': forms.CheckboxSelectMultiple(),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_enctype = 'multipart/form-data'
        self.helper.layout = Layout(
            Field('title', css_class='mb-4'),
            Field('content', css_class='mb-4'),
            Field('excerpt', css_class='mb-4'),
            Field('image', css_class='mb-4'),
            Field('status', css_class='mb-4'),
            Field('publication_date', css_class='mb-4'),
            Field('category', css_class='mb-4'),
            Field('tags', css_class='mb-4'),
            Field('featured', css_class='mb-4'),
            Submit('submit', 'Salvar Post', css_class='bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded')
        )
        
        for field in self.fields.values():
            if field.widget.__class__.__name__ not in ['CheckboxInput', 'CheckboxSelectMultiple']:
                field.widget.attrs.update({
                    'class': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                })


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['title', 'description', 'start_date', 'end_date', 'location', 'visibility', 
                 'event_type', 'capacity', 'organizer', 'speakers', 'tags', 'image', 
                 'registration_required', 'price', 'featured']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 5}),
            'start_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'end_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'speakers': forms.Textarea(attrs={'rows': 3}),
            'tags': forms.CheckboxSelectMultiple(),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_enctype = 'multipart/form-data'
        self.helper.layout = Layout(
            Field('title', css_class='mb-4'),
            Field('description', css_class='mb-4'),
            Field('start_date', css_class='mb-4'),
            Field('end_date', css_class='mb-4'),
            Field('location', css_class='mb-4'),
            Field('visibility', css_class='mb-4'),
            Field('event_type', css_class='mb-4'),
            Field('capacity', css_class='mb-4'),
            Field('organizer', css_class='mb-4'),
            Field('speakers', css_class='mb-4'),
            Field('tags', css_class='mb-4'),
            Field('image', css_class='mb-4'),
            Field('registration_required', css_class='mb-4'),
            Field('price', css_class='mb-4'),
            Field('featured', css_class='mb-4'),
            Submit('submit', 'Salvar Evento', css_class='bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded')
        )
        
        for field in self.fields.values():
            if field.widget.__class__.__name__ not in ['CheckboxInput', 'CheckboxSelectMultiple']:
                field.widget.attrs.update({
                    'class': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                })


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'message': forms.Textarea(attrs={'rows': 5}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Field('name', css_class='mb-4'),
            Field('email', css_class='mb-4'),
            Field('subject', css_class='mb-4'),
            Field('message', css_class='mb-4'),
            Submit('submit', 'Enviar Mensagem', css_class='bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded')
        )
        
        for field in self.fields.values():
            field.widget.attrs.update({
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500',
                'placeholder': field.label
            })
