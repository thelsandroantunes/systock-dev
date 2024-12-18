# Projeto CRUD de Usuários - Vue.js + Laravel

Este projeto é uma aplicação CRUD de usuários utilizando Vue.js no front-end e Laravel no back-end, com Docker para facilitar a configuração e execução.

## Tecnologias Utilizadas

- **Front-end:** Vue.js, Vuetify, Axios
- **Back-end:** PHP, Laravel, Postgres
- **Containerização:** Docker

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Estrutura do Projeto

- `frontend/` - Contém o código do front-end (Vue.js + Vuetify)
- `backend/` - Contém o código do back-end (Laravel)

## Configuração e Execução

### 1. Clonar o Repositório

Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/thelsandroantunes/systock-dev.git
cd systock-dev
```

### 2. Configurar o Back-end
#### 2.1. Acessar o diretório do back-end

```bash
cd backend
```

#### 2.2. Build e execução do back-end

```bash
docker-compose up -d
```

#### 2.3. Instalar as dependências do Laravel
Acesse o container do Laravel e instale as dependências:

```bash
docker exec -it seu_container_backend bash
composer install
```

#### 2.4. Rodar as migrações
Execute as migrações para criar as tabelas no banco de dados, caso não execute de início:

```bash
php artisan migrate
```

### 3. Configurar o Front-end
#### 3.1. Acessar o diretório do front-end

```bash
cd ../frontend
```

#### 3.2. Instalar as dependências do Vue.js

```bash
npm install
```

#### 3.3. Executar o front-end

```bash
npm run serve
```

### 4. Acessar a Aplicação
O back-end estará disponível em http://localhost:8000.
O front-end estará disponível em http://localhost:3000.
