# API de Usuários (Node.js + Express)

Esta API permite registrar, logar, listar e deletar usuários, utilizando um banco de dados em memória. Ideal para estudos de automação e testes de API.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:

```bash
npm install express swagger-ui-express
```

## Como rodar

- Para iniciar o servidor:

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /register` — Registra um novo usuário
- `POST /login` — Realiza login
- `GET /users` — Lista todos os usuários cadastrados
- `DELETE /users/:username` — Deleta um usuário pelo nome
- `GET /api-docs` — Documentação Swagger interativa

## Regras de negócio

- Login e senha são obrigatórios para login e registro.
- Não é permitido registrar usuários duplicados.
- É possível deletar usuários já cadastrados.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Testes

Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados (ex: Supertest).

## Documentação Swagger

Acesse `http://localhost:3000/api-docs` para visualizar e testar os endpoints via Swagger UI.
