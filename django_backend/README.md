# Django Backend NEABI

Este é o backend Django completo para o projeto NEABI, implementando todas as funcionalidades solicitadas para gerenciamento de posts, eventos e usuários.

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Posts

- **Criação de posts** com título, conteúdo editável, autor, imagem opcional
- **Status de rascunho ou publicado** com data de publicação
- **Visibilidade pública** apenas para posts publicados e dentro do período válido
- **Área administrativa** para criar, editar, excluir e visualizar posts
- **Categorias e tags** para organização
- **Sistema de visualizações** e posts em destaque

### ✅ Sistema de Eventos

- **Armazenamento completo** das informações no banco de dados
- **Visibilidade pública ou privada** para eventos
- **Exibição para leitores** apenas de eventos públicos e futuros
- **Gerenciamento administrativo** completo (CRUD)
- **Validação obrigatória** - data final posterior à inicial
- **Informações detalhadas** (palestrantes, capacidade, local, etc.)

### ✅ Sistema de Usuários

- **Dois tipos de usuário**: Leitor e Administrador
- **Usuário Leitor**: acesso apenas a conteúdo publicado
- **Usuário Admin**: acesso à área restrita para gerenciar posts e eventos
- **Sistema de autenticação** personalizado
- **Área administrativa separada** do Django Admin padrão

### ✅ API RESTful

- **Endpoints completos** para integração com React frontend
- **Permissões baseadas em roles** (admin/reader)
- **Filtros e busca** avançados
- **Paginação** automática
- **Validações** de segurança

## 📁 Estrutura do Projeto

```
django_backend/
├── manage.py
├── requirements.txt
├── setup.py
├── neabi/                 # Projeto principal
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── core/                  # App principal
    ├── models.py          # Modelos (Post, Event, UserProfile)
    ├── views.py           # Views públicas
    ├── admin_views.py     # Views da área administrativa
    ├── auth_views.py      # Views de autenticação
    ├── api_views.py       # API ViewSets
    ├── serializers.py     # Serializers da API
    ├── forms.py           # Formulários Django
    ├── decorators.py      # Decorators de permissão
    ├── signals.py         # Signals para criação de perfis
    ├── urls.py            # URLs públicas
    ├── admin_urls.py      # URLs da área administrativa
    ├── auth_urls.py       # URLs de autenticação
    └── api_urls.py        # URLs da API
```

## 🛠️ Configuração e Instalação

### 1. Requisitos

- Python 3.8+
- pip

### 2. Instalação Rápida

```bash
cd django_backend
python setup.py
```

Este script automaticamente:

- Instala todas as dependências
- Cria arquivo .env com SECRET_KEY segura
- Executa migrações
- Coleta arquivos estáticos

### 3. Criar Superusuário

```bash
python manage.py createsuperuser
```

### 4. Iniciar Servidor

```bash
python manage.py runserver
```

## 🔗 URLs Principais

### Área Pública

- **Home**: `http://127.0.0.1:8000/`
- **Blog**: `http://127.0.0.1:8000/blog/`
- **Eventos**: `http://127.0.0.1:8000/eventos/`
- **Sobre**: `http://127.0.0.1:8000/sobre/`
- **Contato**: `http://127.0.0.1:8000/contato/`

### Autenticação

- **Login**: `http://127.0.0.1:8000/auth/login/`
- **Registro**: `http://127.0.0.1:8000/auth/register/`
- **Logout**: `http://127.0.0.1:8000/auth/logout/`

### Área Administrativa (Apenas Admins)

- **Dashboard**: `http://127.0.0.1:8000/admin-area/`
- **Gerenciar Posts**: `http://127.0.0.1:8000/admin-area/posts/`
- **Gerenciar Eventos**: `http://127.0.0.1:8000/admin-area/events/`
- **Mensagens de Contato**: `http://127.0.0.1:8000/admin-area/messages/`

### API RESTful

- **API Root**: `http://127.0.0.1:8000/api/`
- **Posts**: `http://127.0.0.1:8000/api/posts/`
- **Eventos**: `http://127.0.0.1:8000/api/events/`
- **Categorias**: `http://127.0.0.1:8000/api/categories/`
- **Tags**: `http://127.0.0.1:8000/api/tags/`

### Django Admin (Superuser)

- **Django Admin**: `http://127.0.0.1:8000/django-admin/`

## 👥 Sistema de Usuários

### Tipos de Usuário

1. **Leitor (`reader`)**
   - Acesso apenas a conteúdo público
   - Pode ler posts publicados
   - Pode visualizar eventos públicos futuros
   - Não tem acesso à área administrativa

2. **Administrador (`admin`)**
   - Acesso completo à área administrativa
   - Pode criar, editar e excluir posts
   - Pode gerenciar eventos
   - Pode visualizar mensagens de contato
   - Pode gerenciar categorias e tags

### Criando Usuários

1. **Via Registro Público**: `http://127.0.0.1:8000/auth/register/`
2. **Via Django Admin**: Como superuser, criar usuário e definir role
3. **Via API**: Endpoint para criação (apenas admins)

## 📊 Modelos de Dados

### Post

```python
- title: CharField (título)
- content: TextField (conteúdo editável)
- author: ForeignKey (autor)
- image: ImageField (imagem opcional)
- status: CharField (draft/published)
- publication_date: DateTimeField (data de publicação)
- category: ForeignKey (categoria)
- tags: ManyToManyField (tags)
- featured: BooleanField (destaque)
- views: PositiveIntegerField (visualizações)
```

### Event

```python
- title: CharField (título)
- description: TextField (descrição)
- start_date: DateTimeField (data/hora início)
- end_date: DateTimeField (data/hora fim) # validação: > start_date
- location: CharField (local)
- visibility: CharField (public/private)
- event_type: CharField (presencial/online/híbrido)
- organizer: CharField (organizador)
- speakers: TextField (palestrantes)
- capacity: PositiveIntegerField (capacidade)
- featured: BooleanField (destaque)
```

## 🔒 Segurança e Permissões

- **CSRF Protection**: Ativo em todos os formulários
- **Role-based Access**: Decorators e mixins para controle
- **API Permissions**: DRF permissions customizadas
- **Validações**: Models com validação personalizada
- **CORS**: Configurado para React frontend

## 🔄 Integração com React

O backend está configurado para integração com o frontend React:

- **CORS habilitado** para `localhost:5173`
- **API RESTful completa** com endpoints estruturados
- **Serializers otimizados** para diferentes cenários
- **Filtros e busca** via query parameters
- **Paginação automática** (9 items por página para posts)

### Exemplos de Endpoints API

```javascript
// Buscar posts publicados
GET /api/posts/?search=termo&category=Categoria

// Posts em destaque
GET /api/posts/featured/

// Eventos públicos futuros
GET /api/events/?visibility=public

// Criar post (apenas admin)
POST /api/posts/
{
  "title": "Título",
  "content": "Conteúdo...",
  "status": "published",
  "category": 1
}
```

## 🧪 Testando o Sistema

1. **Criar alguns dados iniciais**:
   - Acesse Django Admin e crie categorias
   - Crie alguns posts de teste
   - Crie eventos de teste

2. **Testar permissões**:
   - Crie usuário leitor e admin
   - Teste acesso às diferentes áreas
   - Verifique API permissions

3. **Validações**:
   - Teste validação de datas dos eventos
   - Teste visibilidade de posts/eventos
   - Teste filtros da API

## 🚨 Validações Implementadas

- ✅ **Posts**: Apenas publicados e dentro do período válido são visíveis ao público
- ✅ **Eventos**: Apenas públicos e futuros são visíveis aos leitores
- ✅ **Datas**: Data final do evento deve ser posterior à inicial
- ✅ **Permissões**: Admin vs Reader rigorosamente controlado
- ✅ **API**: Endpoints seguros com permissões adequadas

## 📝 Próximos Passos

1. **Configurar templates Django** (opcional - para uso sem React)
2. **Configurar produção** (PostgreSQL, Gunicorn, Nginx)
3. **Implementar testes unitários**
4. **Configurar deploy** (Docker, Railway, Heroku)
5. **Adicionar cache** (Redis para performance)

---

🎉 **Backend completo e funcional!** Todos os requisitos implementados com segurança e boas práticas Django.
