#!/bin/bash

# NEABI Django Setup Script
echo "🎯 Setting up NEABI Django Project..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 and try again."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3 and try again."
    exit 1
fi

echo "✅ Python and pip found"

# Install Django dependencies
echo "📦 Installing Django dependencies..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create database migrations
echo "🗄️ Creating database migrations..."
python3 manage.py makemigrations

if [ $? -ne 0 ]; then
    echo "❌ Failed to create migrations."
    exit 1
fi

# Apply database migrations
echo "🔄 Applying database migrations..."
python3 manage.py migrate

if [ $? -ne 0 ]; then
    echo "❌ Failed to apply migrations."
    exit 1
fi

echo "✅ Database migrations completed"

# Create static files directory
echo "📁 Creating static files directories..."
mkdir -p static/css static/js static/images media

# Collect static files (for production)
echo "📋 Collecting static files..."
python3 manage.py collectstatic --noinput

# Setup initial NEABI data
echo "🌱 Setting up initial NEABI data..."
python3 manage.py setup_neabi

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup initial data."
    exit 1
fi

echo "✅ Initial data setup completed"

# Create superuser (optional)
read -p "Do you want to create an additional superuser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "👤 Creating superuser..."
    python3 manage.py createsuperuser
fi

echo ""
echo "🎉 NEABI Django project setup completed successfully!"
echo ""
echo "📋 Summary:"
echo "   ✅ Dependencies installed"
echo "   ✅ Database migrations applied"
echo "   ✅ Static files configured"
echo "   ✅ Initial data created"
echo ""
echo "🔑 Default login credentials:"
echo "   Admin: admin@neabi.edu.br / admin123"
echo "   Reader: leitor@neabi.edu.br / leitor123"
echo ""
echo "🚀 To start the development server, run:"
echo "   python3 manage.py runserver"
echo ""
echo "🌐 Then open your browser to: http://localhost:8000"
echo ""
echo "🔧 Admin interface available at: http://localhost:8000/django-admin/"
echo "📊 NEABI Admin available at: http://localhost:8000/admin/dashboard/"
