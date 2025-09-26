# NEABI Django - Sistema Completo

Sistema web completo do Núcleo de Estudos Afro-Brasileiros e Indígenas adaptado para Django, mantendo todas as funcionalidades do projeto React original.

## 🎯 Características

### ✅ Sistema Completo Implementado

- **Frontend**: Templates Django com design responsivo usando TailwindCSS
- **Backend**: Django com banco de dados SQLite
- **Autenticação**: Sistema de usuários com roles (admin/reader)
- **Blog**: Sistema completo de posts com categorias e tags
- **Eventos**: Gerenciamento completo de eventos
- **Admin**: Interface administrativa customizada
- **Contato**: Formulário de contato funcional

### 🎨 Design e Identidade NEABI

- Logo e cores da identidade visual NEABI
- Design responsivo para mobile e desktop
- Componentes reutilizáveis
- Estilo consistente em todo o sistema

## 🚀 Instalação Rápida

### Opção 1: Script Automático (Recomendado)

**Linux/macOS:**

```bash
./setup_django.sh
```

**Windows:**

```cmd
setup_django.bat
```

### Opção 2: Instalação Manual

1. **Instalar dependências:**

```bash
pip install -r requirements.txt
```

2. **Configurar banco de dados:**

```bash
python manage.py makemigrations
python manage.py migrate
```

3. **Criar dados iniciais:**

```bash
python manage.py setup_neabi
```

4. **Executar servidor:**

```bash
python manage.py runserver
```

## 🔑 Usuários Padrão

O sistema vem com usuários pré-configurados para teste:

| Tipo       | Email               | Senha     | Permissões                 |
| ---------- | ------------------- | --------- | -------------------------- |
| **Admin**  | admin@neabi.edu.br  | admin123  | Acesso completo ao sistema |
| **Leitor** | leitor@neabi.edu.br | leitor123 | Acesso público + login     |

## 📱 Funcionalidades

### 🏠 Site Público

- **Página Inicial**: Apresentação do NEABI com eventos e posts em destaque
- **Sobre**: Informações sobre o núcleo
- **Blog**: Lista de posts com busca e filtros
- **Eventos**: Lista de eventos com inscrições
- **Projetos**: Página de projetos do NEABI
- **Contato**: Formulário funcional de contato

### 🔐 Sistema de Login

- Login seguro com validação
- Redirecionamento baseado em role
- Sessões seguras

### 📊 Painel Administrativo

- Dashboard com estatísticas
- Gestão completa de posts
- Gestão completa de eventos
- Visualização de mensagens de contato
- Interface intuitiva e responsiva

### 📝 Gestão de Conteúdo

- **Posts**: Criar, editar, deletar posts do blog
- **Eventos**: Criar, editar, deletar eventos
- **Categorias**: Sistema de categorização
- **Tags**: Sistema de tags para organização
- **Usuários**: Gestão de usuários do sistema

## 🏗️ Estrutura do Projeto

```
neabi_django/
├── neabi_django/          # Configurações do Django
│   ├── settings.py        # Configurações principais
│   ├── urls.py           # URLs principais
│   └── wsgi.py           # WSGI config
├── core/                 # App principal
│   ├── models.py         # Modelos de dados
│   ├── views.py          # Views do sistema
│   ├── forms.py          # Formulários
│   ├── admin.py          # Configuração admin
│   ├── urls.py           # URLs do app
│   └── management/       # Comandos customizados
├── templates/            # Templates HTML
│   ├── base.html         # Template base
│   ├── includes/         # Componentes reutilizáveis
│   ├── pages/           # Páginas públicas
│   ├── admin/           # Templates admin
│   └── components/      # Componentes específicos
├── static/              # Arquivos estáticos
│   ├── css/            # CSS customizado
│   ├── js/             # JavaScript
│   └── images/         # Imagens
├── media/              # Uploads de usuários
├── manage.py           # Comando Django
├── requirements.txt    # Dependências Python
└── setup_django.sh    # Script de instalação
```

## 🎨 Tecnologias Utilizadas

### Backend

- **Django 4.2** - Framework web
- **SQLite** - Banco de dados
- **Pillow** - Processamento de imagens
- **django-crispy-forms** - Formulários estilizados

### Frontend

- **TailwindCSS** - Framework CSS
- **JavaScript Vanilla** - Interatividade
- **HTML5** - Estrutura
- **CSS3** - Estilização customizada

## 📋 Funcionalidades Detalhadas

### 1. Sistema de Posts

- ✅ Criação, edição e exclusão de posts
- ✅ Sistema de categorias
- ✅ Sistema de tags
- ✅ Posts em destaque
- ✅ Contador de visualizações
- ✅ Sistema de likes
- ✅ Busca e filtros
- ✅ Paginação
- ✅ URLs amigáveis (slugs)

### 2. Sistema de Eventos

- ✅ Gestão completa de eventos
- ✅ Tipos de evento (presencial, online, híbrido)
- ✅ Sistema de inscrições
- ✅ Controle de capacidade
- ✅ Status do evento
- ✅ Eventos em destaque
- ✅ Filtros por categoria e tipo

### 3. Sistema de Usuários

- ✅ Registro e login seguro
- ✅ Roles diferenciados (admin/reader)
- ✅ Perfis de usuário
- ✅ Controle de acesso

### 4. Interface Administrativa

- ✅ Dashboard com estatísticas
- ✅ Gestão visual de conteúdo
- ✅ Interface responsiva
- ✅ Filtros e busca
- ✅ Ações em lote

## 🔧 Comandos Úteis

### Desenvolvimento

```bash
# Executar servidor de desenvolvimento
python manage.py runserver

# Criar migrations
python manage.py makemigrations

# Aplicar migrations
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Resetar dados iniciais
python manage.py setup_neabi --reset

# Coletar arquivos estáticos
python manage.py collectstatic
```

### Produção

```bash
# Instalar dependências
pip install -r requirements.txt

# Configurar banco de dados
python manage.py migrate

# Criar dados iniciais
python manage.py setup_neabi

# Coletar arquivos estáticos
python manage.py collectstatic --noinput
```

## 🌐 URLs Importantes

| URL                  | Descrição              |
| -------------------- | ---------------------- |
| `/`                  | Página inicial         |
| `/blog/`             | Lista de posts         |
| `/projetos/eventos/` | Lista de eventos       |
| `/admin/login/`      | Login do sistema       |
| `/admin/dashboard/`  | Painel administrativo  |
| `/django-admin/`     | Admin padrão do Django |

## 📱 Design Responsivo

O sistema foi desenvolvido com design responsivo, funcionando perfeitamente em:

- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

## 🎨 Identidade Visual NEABI

### Cores Principais

- **Âmbar**: `#d97706` (Primária)
- **Vermelho**: `#b91c1c` (Secundária)
- **Gradientes**: Combinações harmoniosas das cores principais

### Tipografia

- **Font**: System fonts otimizadas
- **Hierarquia**: Clara e acessível
- **Contraste**: Adequado para acessibilidade

## 🔒 Segurança

### Medidas Implementadas

- ✅ Proteção CSRF
- ✅ Validação de entrada
- ✅ Autenticação segura
- ✅ Controle de acesso baseado em roles
- ✅ Sanitização de dados
- ✅ Headers de segurança

### Configurações de Produção

- ✅ Debug desabilitado
- ✅ HTTPS enforced
- ✅ Cookies seguros
- ✅ Validação de hosts

## 📊 Performance

### Otimizações Implementadas

- ✅ CSS e JS minificados
- ✅ Lazy loading de imagens
- ✅ Paginação eficiente
- ✅ Queries otimizadas
- ✅ Cache de templates
- ✅ Compressão de arquivos estáticos

## 🚀 Deploy

### Preparação para Produção

1. Configurar variáveis de ambiente
2. Configurar banco de dados de produção
3. Configurar servidor web (nginx/apache)
4. Configurar WSGI (gunicorn)
5. Configurar SSL/HTTPS

### Variáveis de Ambiente Recomendadas

```env
SECRET_KEY=sua-chave-secreta-super-segura
DEBUG=False
ALLOWED_HOSTS=seudominio.com,www.seudominio.com
DATABASE_URL=sqlite:///path/to/db.sqlite3
```

## 🆘 Suporte e Ajuda

### Problemas Comuns

**1. Erro de migração:**

```bash
python manage.py migrate --fake-initial
```

**2. Arquivos estáticos não carregam:**

```bash
python manage.py collectstatic --clear
```

**3. Permissões de usuário:**

```bash
python manage.py setup_neabi --reset
```

### Logs e Debug

- Logs são salvos no console durante desenvolvimento
- Para produção, configure logging em `settings.py`
- Use `DEBUG=True` apenas em desenvolvimento

## 📈 Próximos Passos

### Funcionalidades Futuras Sugeridas

- [ ] Sistema de comentários nos posts
- [ ] Newsletter e notificações
- [ ] Galeria de imagens
- [ ] Sistema de avaliação de eventos
- [ ] API REST para mobile
- [ ] Integração com redes sociais
- [ ] Sistema de relatórios

### Melhorias Técnicas

- [ ] Cache com Redis
- [ ] Banco PostgreSQL
- [ ] CDN para arquivos estáticos
- [ ] Monitoramento de performance
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 🤝 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### Padrões de Código

- Siga PEP 8 para Python
- Use comentários descritivos
- Mantenha consistência no estilo
- Teste suas alterações

## 📄 Licença

Este projeto é uma adaptação do sistema NEABI original para Django, mantendo toda a funcionalidade e identidade visual.

---

## 🎉 Conclusão

O sistema Django NEABI está **100% funcional** e pronto para uso, oferecendo:

- ✅ **Sistema completo** de gerenciamento de conteúdo
- ✅ **Interface administrativa** intuitiva e responsiva
- ✅ **Design responsivo** com identidade visual NEABI
- ✅ **Segurança** implementada seguindo best practices
- ✅ **Performance** otimizada para produção
- ✅ **Escalabilidade** preparada para crescimento

**Para começar, execute:**

```bash
./setup_django.sh
python manage.py runserver
```

**Acesse:** http://localhost:8000

**Login Admin:** admin@neabi.edu.br / admin123

🌟 **O sistema está pronto para ser usado em produção!**
