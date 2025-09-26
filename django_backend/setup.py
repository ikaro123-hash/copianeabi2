#!/usr/bin/env python3
"""
Script para configuração inicial do projeto Django NEABI
Execute este script para configurar o projeto pela primeira vez.
"""

import os
import sys
import subprocess
import secrets
import shutil
from pathlib import Path


def run_command(command, description):
    """Executa um comando e exibe o resultado"""
    print(f"\n{'='*50}")
    print(f"🔧 {description}")
    print(f"{'='*50}")
    
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        if result.stdout:
            print(result.stdout)
        print(f"✅ {description} - Concluído!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro em {description}:")
        print(e.stderr)
        return False


def create_env_file():
    """Cria arquivo .env com SECRET_KEY gerada"""
    env_file = Path('.env')
    env_example = Path('.env.example')
    
    if env_file.exists():
        print("🔍 Arquivo .env já existe.")
        return
    
    if env_example.exists():
        # Gerar SECRET_KEY segura
        secret_key = secrets.token_urlsafe(50)
        
        # Ler template e substituir SECRET_KEY
        with open(env_example, 'r') as f:
            content = f.read()
        
        content = content.replace('your-secret-key-here-change-this-in-production', secret_key)
        
        # Escrever arquivo .env
        with open(env_file, 'w') as f:
            f.write(content)
        
        print("✅ Arquivo .env criado com SECRET_KEY segura!")
    else:
        print("❌ Arquivo .env.example não encontrado!")


def main():
    print("🚀 Configurando projeto Django NEABI...")
    print("="*60)
    
    # Verificar se está no diretório correto
    if not Path('manage.py').exists():
        print("❌ manage.py não encontrado! Execute este script no diretório django_backend/")
        sys.exit(1)
    
    # Criar arquivo .env
    create_env_file()
    
    # Lista de comandos para execução
    commands = [
        ("pip install -r requirements.txt", "Instalando dependências Python"),
        ("python manage.py makemigrations", "Criando migrações"),
        ("python manage.py migrate", "Aplicando migrações"),
        ("python manage.py collectstatic --noinput", "Coletando arquivos estáticos"),
    ]
    
    # Executar comandos
    for command, description in commands:
        if not run_command(command, description):
            print(f"\n❌ Falha ao executar: {description}")
            print("💡 Verifique os erros acima e tente novamente.")
            sys.exit(1)
    
    print("\n" + "="*60)
    print("🎉 Configuração concluída com sucesso!")
    print("="*60)
    print("\n📋 Próximos passos:")
    print("1. Criar superusuário: python manage.py createsuperuser")
    print("2. Iniciar servidor: python manage.py runserver")
    print("3. Acessar http://127.0.0.1:8000/")
    print("4. Área admin: http://127.0.0.1:8000/admin-area/")
    print("5. Django Admin: http://127.0.0.1:8000/django-admin/")
    print("6. API: http://127.0.0.1:8000/api/")
    print("\n💡 Dica: Configure dados iniciais usando o Django admin!")


if __name__ == "__main__":
    main()
