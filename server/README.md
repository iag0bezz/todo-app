<h3 align="center">
  💻 <strong>SERVER SIDE</strong> 💻 
</h3>

## 💡 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:
<strong>
- [Node.JS](https://nodejs.org/en/)
- [Express](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://typeorm.io/)
- [JsonWebToken](https://jwt.io/)
- [TSyringe](https://www.npmjs.com/package/tsyringe)
- [Jest](https://jestjs.io/pt-BR/)
- [SuperTest](https://www.npmjs.com/package/supertest)
</strong>

<!-- Caso necessário, adicionar outras. -->

### 🎲 Executando o projeto
    
```bash
# Instalando as dependências
$ yarn install | npm install

# Executar o docker-compose para gerar o banco de dados do PostgresQL.
$ docker-compose up -D

# Gerar um arquivo .env e inserir o modelo dentro de .env.example
# Configurar o valor "DATABASE_URL" para o padrão Prisma (https://www.prisma.io/docs/concepts/database-connectors/postgresql)

# Realizar o push do arquivo schema.prisma para o banco de dados PostgreSQL
$ yarn prisma db push | npx prisma db push

# Gerar o cliente usando Prisma
$ yarn prisma generate | npx prisma generate

# Executar os teste
$ yarn test | npm run test

# Executar o projeto em modo de desenvolvimento
$ yarn dev | npm run dev
```

## 📝 Licença

Este projeto usa a licença [MIT](https://github.com/iag0bezz/todo-app/blob/main/LICENSE).

---

<p align="center">
    Feito com 🖤 por Iago Beserra 👋
</p>