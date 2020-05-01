# Bexs Perguntas e Respostas

> API para controle de perguntas e respostas

## Instalação

Você deverá ter em sua máquina os seguinte itens:

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) 10.0.0 (ou superior)
- [Postgres](https://www.postgresql.org/download/) (Caso prefira poderá executá-lo através do [Docker](https://www.docker.com/) (docker-compose.yml))

1. Faça um Fork ou clone este repositório.

2. Instale as dependências do projeto:

   ```sh
   npm install
   ```

   ou se você usa yarn:

   ```sh
   yarn
   ```

3. Crie um arquivo `.env` no diretório raiz, utilize o arquivo `.env-example` como padrão.

4. Tenha o [Postgres](https://www.postgresql.org/) rodando em sua máquina com um database com nome `bexs` (caso queira outro nome altere o arquivo `.env`) — ou execute o [Docker Compose](https://docs.docker.com/compose/) (neste caso o database `bexs` será criado automaticamente):

   ```sh
   docker-compose up
   ```

   _Será executado o Postgres em sua máquina virtual docker na porta `5432`, isso pode ser alterado no arquivo `docker-compose.yml`._

5. Execute `npx sequelize db:migrate` (ou se você usa yarn `yarn sequelize db:migrate`) para gerar as tabelas no database.

## Execução

Para início da aplicação, execute:

#### `Desenvolvimento`(com [nodemon](https://nodemon.io/)):

```sh
npm run dev
```

ou se você usa yarn:

```sh
yarn dev
```

#### `Produção:`

```sh
npm run start
```

ou se você usa yarn:

```sh
yarn start
```

_Isso iniciará o servidor com base nos dados informados no arquivo `.env`, caso tenha seguido o exemplo iniciará em `localhost:3333`_

## Testes

_Os testes estão localizados na pasta `__tests__`._

Use o comando abaixo para executar os testes:

```sh
npm test
```

ou se você usa yarn:

```sh
yarn test
```

_OBS:. A execução dos testes executa o script `sequelize db:migrate`, criando as tabelas no database_

_OBS2:. A execução dos testes efetua a limpeza das tabelas ao final dos testes_

## Endpoints

_OBS:. O projeto contêm os arquivos `insomnia.json` e `bens.postman`, para o uso das API's no [Insomnia](https://insomnia.rest/download/) e no [Postman](https://www.postman.com/downloads/) respectivamente._

### Perguntas

#### `GET`: `/questions?page=<NUMERO_DA_PAGINA>&perPage=<QUANTIDADE_POR_PAGINA>`

_OBS:. O parâmetro `page` e o parâmetro `perPage` são opcionais. Caso os mesmos não sejam fornecidos, serão utilizados os valores 1 e 10 respectivamente`_

`Ação:` Retorna uma lista de perguntas.

#

#### `POST`: `/questions`

```json
{
  "user": "Jessiley Oliveira",
  "text": "Isso é uma pergunta?"
}
```

`Ação:` Cadastra uma nova pergunta.

#

#### `GET`: `/questions/<ID_PERGUNTA>?page=<NUMERO_DA_PAGINA>&perPage=<QUANTIDADE_POR_PAGINA>`

_OBS:. O parâmetro `page` e o parâmetro `perPage` são opcionais. Caso os mesmos não sejam fornecidos, serão utilizados os valores 1 e 10 respectivamente`_

_OBS2:. A paginação é feita nas respostas que a pergunta contém`_

`Ação:` Retorna uma pergunta (e suas respostas) com base no ID

#

### Respostas

#### `POST`: `/questions/<ID_PERGUNTA>/answers`

```json
{
  "user": "Jessiley Oliveira",
  "text": "Isso é uma resposta."
}
```

`Ação:` Cadastra uma nova resposta.

#
