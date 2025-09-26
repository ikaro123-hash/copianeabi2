@echo off
REM NEABI Django Setup Script for Windows
echo 🎯 Setting up NEABI Django Project...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python and try again.
    pause
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip is not installed. Please install pip and try again.
    pause
    exit /b 1
)

echo ✅ Python and pip found

REM Install Django dependencies
echo 📦 Installing Django dependencies...
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies. Please check your internet connection and try again.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create database migrations
echo 🗄️ Creating database migrations...
python manage.py makemigrations

if %errorlevel% neq 0 (
    echo ❌ Failed to create migrations.
    pause
    exit /b 1
)

REM Apply database migrations
echo 🔄 Applying database migrations...
python manage.py migrate

if %errorlevel% neq 0 (
    echo ❌ Failed to apply migrations.
    pause
    exit /b 1
)

echo ✅ Database migrations completed

REM Create static files directory
echo 📁 Creating static files directories...
if not exist "static\css" mkdir static\css
if not exist "static\js" mkdir static\js
if not exist "static\images" mkdir static\images
if not exist "media" mkdir media

REM Collect static files (for production)
echo 📋 Collecting static files...
python manage.py collectstatic --noinput

REM Setup initial NEABI data
echo 🌱 Setting up initial NEABI data...
python manage.py setup_neabi

if %errorlevel% neq 0 (
    echo ❌ Failed to setup initial data.
    pause
    exit /b 1
)

echo ✅ Initial data setup completed

REM Ask about creating superuser
set /p create_superuser="Do you want to create an additional superuser? (y/n): "
if /i "%create_superuser%"=="y" (
    echo 👤 Creating superuser...
    python manage.py createsuperuser
)

echo.
echo 🎉 NEABI Django project setup completed successfully!
echo.
echo 📋 Summary:
echo    ✅ Dependencies installed
echo    ✅ Database migrations applied
echo    ✅ Static files configured
echo    ✅ Initial data created
echo.
echo 🔑 Default login credentials:
echo    Admin: admin@neabi.edu.br / admin123
echo    Reader: leitor@neabi.edu.br / leitor123
echo.
echo 🚀 To start the development server, run:
echo    python manage.py runserver
echo.
echo 🌐 Then open your browser to: http://localhost:8000
echo.
echo 🔧 Admin interface available at: http://localhost:8000/django-admin/
echo 📊 NEABI Admin available at: http://localhost:8000/admin/dashboard/

pause
