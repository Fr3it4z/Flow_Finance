# Flow Finance

Aplicação de gestão financeira pessoal — backend em **Laravel** (API) e frontend em **Angular**. Atualmente em fase de **MVP**.

## 🧱 Stack & Versões

| Componente | Versão usada no projeto |
|---|---|
| PHP | ^8.3 (testado com 8.4) |
| Laravel | ^13.0 |
| Laravel Sanctum | ^4.0 |
| Composer | 2.x |
| Node.js | 20.x |
| Angular | ^21.2.0 |
| Angular CLI | ^21.2.5 |
| Base de dados (dev) | SQLite (default no `.env`) — ver nota abaixo sobre MySQL/MariaDB |

> Nota: o `.env.example` do backend já vem configurado com `DB_CONNECTION=sqlite`, o que evita ter de instalar MySQL/MariaDB localmente enquanto não há Docker configurado. As variáveis para MySQL/MariaDB estão comentadas no ficheiro, prontas a usar quando o Docker (ou um servidor de BD próprio) estiver disponível.

## 🚀 Instalação local (sem Docker)

Pré-requisitos:
- PHP >= 8.3 + extensões padrão do Laravel
- Composer 2.x
- Node.js 20.x + npm
- Angular CLI (`npm install -g @angular/cli`) — opcional, o projeto já traz `@angular/cli` como devDependency

### 1. Backend (Laravel)

```bash
cd backend

# Instalar dependências PHP
composer install

# Configurar variáveis de ambiente
cp .env.example .env
php artisan key:generate

# Criar a base de dados (SQLite local)
touch database/database.sqlite

# Correr as migrations
php artisan migrate

# Iniciar o servidor da API
php artisan serve
```

A API fica disponível em `http://localhost:8000`.

### 2. Frontend (Angular)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

O frontend fica disponível em `http://localhost:4200`.

### 3. Quando o Docker estiver configurado

Quando passares a usar Docker (ex: MySQL/MariaDB em container), basta atualizar no `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=flow_finance
DB_USERNAME=root
DB_PASSWORD=
```

e voltar a correr `php artisan migrate`.

## 📂 Estrutura do projeto

```
Flow_Finance/
├── backend/      # API Laravel
├── frontend/     # SPA Angular
└── dbtheory/     # Esquema de referência da base de dados (create.sql)
```

## 🗺️ Etapas de desenvolvimento (MVP)

- [x] Esquema da base de dados (users, categories, transactions, saving_goals)
- [x] Autenticação (registo/login com Sanctum, throttle no login)
- [x] CRUD de Categorias (API)
- [x] CRUD de Transações (API)
- [x] CRUD de Objetivos de Poupança (API)
- [x] Frontend: Welcome page
- [x] Frontend: Sign In (Login + Registo)
- [ ] **Backend: dados para o painel principal (dashboard)** — *em desenvolvimento*
- [ ] Frontend: painel principal (dashboard) consumindo a API
- [ ] Frontend: Transações
- [ ] Frontend: Objetivos de poupança
- [ ] Dark mode

O escopo deste MVP fecha-se aqui — dashboard, transações, objetivos de poupança e dark mode. Containerização com Docker e deploy ficam para depois do MVP.

> Esta lista reflete o estado do MVP e deve ser atualizada à medida que cada etapa avança.
