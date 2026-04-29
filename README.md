🚀 Getting Started (Como correr localmente)

1. Pré-requisitos

    Node.js & Angular CLI

    PHP & Composer

    MariaDB / MySQL

2. Configuração do Backend (Laravel)

Abre o terminal, navega até à pasta do backend e executa:
```bash

# Entrar na pasta do backend
cd meu-backend-laravel

# Instalar dependências do PHP
composer install

# Configurar as variáveis de ambiente (Base de Dados)
cp .env.example .env

# Gerar a chave da aplicação
php artisan key:generate

# Criar as tabelas na base de dados (Onde a magia das tuas migrations acontece!)
php artisan migrate

# Iniciar o servidor local da API
php artisan serve

´´´
