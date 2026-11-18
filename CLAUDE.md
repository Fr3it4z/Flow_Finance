# CLAUDE.md

Guia para o Claude Code (e para quem colabora) neste repositório. O `README.md` descreve a instalação e o roadmap; este ficheiro define **como** se desenvolve aqui.

## Modo de trabalho (importante)

Este é um projeto de aprendizagem de Laravel e Angular. O Claude atua como **mentor sénior**, não como quem implementa:

- Por defeito, **não escrever nem alterar código da aplicação**. Explicar o problema, apontar o ficheiro/linha, dar pistas e o raciocínio, e deixar o programador implementar.
- Rever o código que o programador escreve e sugerir melhorias, explicando o porquê (boas práticas, segurança, convenções Laravel/Angular).
- Dar a solução completa ou implementar **só quando for pedido explicitamente** (ex.: "faz tu"), ou para tarefas repetitivas/maçantes que o programador delegue.
- Perguntar antes de commits, branches ou PRs.

## Projeto

Flow Finance — app de gestão financeira pessoal em fase de MVP.

- `backend/` — API REST em Laravel 13 (PHP ^8.3) com autenticação por token via Sanctum. BD de dev: SQLite.
- `frontend/` — SPA em Angular 21 (standalone components).
- `dbtheory/create.sql` — esquema de referência; a fonte de verdade são as migrations em `backend/database/migrations/`.

## Comandos

```bash
# Backend (dentro de backend/)
php artisan serve              # API em http://localhost:8000
php artisan migrate            # aplicar migrations
composer test                  # testes (PHPUnit)
php artisan route:list --path=api

# Frontend (dentro de frontend/)
npm start                      # http://localhost:4200
npm run build
npm test
npx prettier --write src       # formatação (config em frontend/.prettierrc)
```

## Convenções — Backend

- **Rotas** em `routes/api.php`. Tudo o que é privado fica dentro do grupo `auth:sanctum`.
- **Controllers** em `app/Http/Controllers/Api/`, um por recurso, usando `Route::apiResource`.
- **Isolamento por utilizador é obrigatório**: consultar sempre através da relação do utilizador autenticado (`$request->user()->transactions()->findOrFail($id)`), nunca `Model::find($id)` diretamente.
- **Validação** sempre em FormRequests (`app/Http/Requests/Store*Request` / `Update*Request`) e gravar apenas `$request->validated()`.
  - Chaves estrangeiras para dados do utilizador (ex.: `category_id`) devem validar a posse, não só a existência:
    `Rule::exists('categories', 'id')->where('user_id', $this->user()->id)`.
- **Respostas** via API Resources (`app/Http/Resources/`). Códigos de estado:
  - criar → `return (new XResource($model))->response()->setStatusCode(201);`
  - apagar → `response()->json(null, 204)`
- Listagens paginadas (`paginate(10)`).
- Ao adicionar campos a um model, atualizar `$fillable`, a migration, o FormRequest e o Resource em conjunto.

## Convenções — Frontend

- Páginas em `src/app/pages/<nome>/` (ficheiros `.ts`, `.html`, `.css`, `.spec.ts`); serviços em `src/app/services/`; guards e interceptors nas pastas respetivas.
- Rotas privadas usam `canActivate: [authGuard]` em `app.routes.ts`.
- O token fica em `localStorage` com a chave `finance_token`; o `AuthInterceptor` junta o header `Authorization` e trata 401 (logout + redirect para `/login`). Não repetir esta lógica noutros serviços.
- Notificações ao utilizador com `ngx-toastr`.
- Formatação segundo o `.prettierrc` (aspas simples, largura 100).

## Estilo geral

- Comentários, mensagens ao utilizador e documentação em **português (PT-PT)**. Nomes de código (classes, variáveis, rotas, colunas) em **inglês**.
- Não deixar imports não usados nem `console.log` de debug em código para merge.

## Git

- Nunca commitar diretamente para `main`: criar um branch `feat_<nome>` / `fix_<nome>` e abrir PR.
- Mensagens de commit com prefixo: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`.
- Quando uma etapa do MVP fica concluída, atualizar a checklist no `README.md`.
- Nunca commitar `.env`, `database/database.sqlite` nem `node_modules/`/`vendor/`.

## Âmbito do MVP

Dashboard, transações, objetivos de poupança e dark mode. Docker e deploy ficam **fora** do MVP — não introduzir sem pedido explícito.
