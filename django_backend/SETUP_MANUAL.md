# Setup Manual - Django NEABI

## 🚨 Problemas Comuns e Soluções

### 1. Erro: 'pip' não é reconhecido

**Causa**: Python não está instalado ou não está no PATH do Windows.

**Solução**:

1. Baixe Python em: https://python.org/downloads/
2. **IMPORTANTE**: Marque "Add Python to PATH" durante a instalação
3. Reinicie o prompt de comando
4. Teste: `python --version` e `pip --version`

### 2. Arquivo .env.example não encontrado

**Solução**: O arquivo foi criado agora. Se ainda houver erro:

```bash
# Criar manualmente o arquivo .env
copy con .env
SECRET_KEY=django-insecure-sua-chave-secreta-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
^Z
```

## 📋 Setup Passo a Passo

### Opção 1: Setup Automático (Windows)

```cmd
cd django_backend
setup.bat
```

### Opção 2: Setup Manual

```cmd
# 1. Navegar para o diretório
cd django_backend

# 2. Verificar Python
python --version
pip --version

# 3. Criar arquivo .env (se não existir)
copy .env.example .env

# 4. Instalar dependências
pip install -r requirements.txt

# 5. Criar migrações
python manage.py makemigrations

# 6. Aplicar migrações
python manage.py migrate

# 7. Coletar arquivos estáticos
python manage.py collectstatic --noinput

# 8. Criar superusuário
python manage.py createsuperuser

# 9. Iniciar servidor
python manage.py runserver
```

### Opção 3: Usando Virtual Environment (Recomendado)

```cmd
# 1. Criar ambiente virtual
python -m venv venv

# 2. Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 3. Instalar dependências
pip install -r requirements.txt

# 4. Continuar com os passos 5-9 acima
```

## 🔍 Verificação de Problemas

### Verificar se Python está instalado corretamente:

```cmd
python --version
# Deve mostrar: Python 3.x.x

pip --version
# Deve mostrar: pip x.x.x

where python
# Deve mostrar o caminho da instalação
```

### Verificar dependências:

```cmd
pip list
# Deve mostrar Django, django-cors-headers, etc.
```

### Verificar se o projeto funciona:

```cmd
python manage.py check
# Deve mostrar: System check identified no issues
```

## 🚀 URLs Após Setup

- **Home**: http://127.0.0.1:8000/
- **API**: http://127.0.0.1:8000/api/
- **Admin Area**: http://127.0.0.1:8000/admin-area/
- **Django Admin**: http://127.0.0.1:8000/django-admin/
- **Login**: http://127.0.0.1:8000/auth/login/

## 🔧 Comandos Úteis

```cmd
# Criar superusuário
python manage.py createsuperuser

# Iniciar servidor de desenvolvimento
python manage.py runserver

# Iniciar servidor em porta específica
python manage.py runserver 8080

# Ver migrações pendentes
python manage.py showmigrations

# Resetar banco de dados (cuidado!)
del db.sqlite3
python manage.py migrate

# Criar dados de exemplo
python manage.py shell
```

## 🐛 Troubleshooting

### Erro: "ModuleNotFoundError"

```cmd
pip install -r requirements.txt
```

### Erro: "django.core.exceptions.ImproperlyConfigured"

```cmd
# Verificar arquivo .env
type .env
```

### Erro: "Port already in use"

```cmd
# Usar porta diferente
python manage.py runserver 8080
```

### Erro: CORS

```cmd
# Verificar se django-cors-headers está instalado
pip show django-cors-headers
```

## 💡 Dicas

1. **Sempre use virtual environment** para projetos Python
2. **Mantenha requirements.txt atualizado** após instalar pacotes
3. **Faça backup do banco** antes de mudanças importantes
4. **Use .env para configurações sensíveis**
5. **Teste em ambiente local** antes de deploy

---

🆘 **Precisa de ajuda?** Copie e cole a mensagem de erro completa para diagnóstico.
