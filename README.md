# Template: Express + TypeScript + Prisma (MySQL)

Este projeto � um servidor HTTP em Express com TypeScript e Prisma (MySQL). Use-o como template no GitHub para iniciar rapidamente uma API com ORM e migra��es.

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+ (ou pnpm/yarn, adapte os comandos)
- MySQL 8+ em execu��o e acess�vel

## Como usar como Template no GitHub
- No GitHub, clique em "Use this template" neste reposit�rio.
- Crie o seu novo reposit�rio a partir dele.
- Clone o seu novo reposit�rio localmente:
  - `git clone https://github.com/<seu-usuario>/<seu-repo>.git`
  - `cd <seu-repo>`

## Configura��o de Ambiente (.env)
- Duplique o arquivo `.env.example` para `.env` e ajuste os valores:
  - `DATABASE_URL`: URL do MySQL (usu�rio, senha, host, porta e DB).
    - Se sua senha tiver caracteres especiais, fa�a URL encoding (ex.: `=` vira `%3D`).
  - `PORT`: porta HTTP para o servidor (padr�o 4000).

Exemplo (local):
```
DATABASE_URL="mysql://root:password@localhost:3306/default_db"
PORT=4000
```

## Instala��o e Primeira Execu��o
1) Instale as depend�ncias:
   - `npm install`

2) Gere o Prisma Client (necess�rio na primeira vez e quando o schema mudar):
   - `npx prisma generate`

3) Rode as migra��es (cria/atualiza o schema no banco):
   - `npm run prisma:migrate`
   - ou: `npx prisma migrate dev --name init`

4) Inicie em modo desenvolvimento (hot reload):
   - `npm run dev`

5) (Opcional) Visualize os dados com Prisma Studio:
   - `npx prisma studio`

## Comandos Principais
- `npm run dev` � roda o servidor com hot reload (`tsx watch src/server.ts`).
- `npm run start` � roda o servidor em modo normal (`tsx src/server.ts`).
- `npm run build` � compila TypeScript para `dist/` (se desejar rodar compilado).
- `npm run prisma:migrate` � executa `prisma migrate dev --name init`.

## Estrutura (resumo)
- `src/server.ts` � bootstrap do servidor (l� `PORT`).
- `src/app.ts` � instancia e configura o Express.
- `src/routes/` � rotas (ex.: `src/routes/userRoutes.ts`).
- `src/controllers/` � controladores.
- `src/services/` � servi�os (ex.: usa `PrismaClient`).
- `prisma/schema.prisma` � schema do Prisma (provider MySQL).

## Dicas e Solu��o de Problemas
- Erro: "@prisma/client did not initialize yet" � rode `npx prisma generate`.
- Falha de conex�o MySQL � confirme `DATABASE_URL`, se o MySQL est� ligado e se o usu�rio tem permiss�o para criar/alterar DB.
- Senhas com caracteres especiais � use URL encoding (ex.: `#` -> `%23`, `@` -> `%40`).
- Porta em uso � ajuste `PORT` no `.env`.

## Observa��es
- O generator do Prisma est� configurado para `prisma-client-js` (sa�da padr�o em `node_modules/@prisma/client`).
- Se quiser trocar o banco ou provider, edite `prisma/schema.prisma` e rode `npx prisma migrate dev` novamente.

Bom c�digo! ??
