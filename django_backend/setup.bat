@echo off
echo 🚀 Configurando projeto Django NEABI (Windows)...
echo ============================================================

REM Verificar se Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python não encontrado! 
    echo 💡 Instale Python em: https://python.org/downloads/
    echo 💡 Certifique-se de marcar "Add Python to PATH" durante a instalação
    pause
    exit /b 1
)

REM Verificar se pip está disponível
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip não encontrado!
    echo 💡 Reinstale Python marcando "Add Python to PATH"
    pause
    exit /b 1
)

REM Verificar se manage.py existe
if not exist "manage.py" (
    echo ❌ manage.py não encontrado! Execute este script no diretório django_backend/
    pause
    exit /b 1
)

echo ✅ Python e pip encontrados!

REM Criar arquivo .env se não existir
if not exist ".env" (
    if exist ".env.example" (
        echo 🔧 Criando arquivo .env...
        copy ".env.example" ".env"
        echo ✅ Arquivo .env criado!
    ) else (
        echo ❌ Arquivo .env.example não encontrado!
    )
)

echo.
echo 🔧 Instalando dependências Python...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências!
    pause
    exit /b 1
)

echo.
echo 🔧 Criando migrações...
python manage.py makemigrations
if %errorlevel% neq 0 (
    echo ❌ Erro ao criar migrações!
    pause
    exit /b 1
)

echo.
echo 🔧 Aplicando migrações...
python manage.py migrate
if %errorlevel% neq 0 (
    echo ❌ Erro ao aplicar migrações!
    pause
    exit /b 1
)

echo.
echo 🔧 Coletando arquivos estáticos...
python manage.py collectstatic --noinput

echo.
echo ============================================================
echo 🎉 Configuração concluída com sucesso!
echo ============================================================
echo.
echo 📋 Próximos passos:
echo 1. Criar superusuário: python manage.py createsuperuser
echo 2. Iniciar servidor: python manage.py runserver
echo 3. Acessar http://127.0.0.1:8000/
echo 4. Área admin: http://127.0.0.1:8000/admin-area/
echo 5. Django Admin: http://127.0.0.1:8000/django-admin/
echo 6. API: http://127.0.0.1:8000/api/
echo.
pause
