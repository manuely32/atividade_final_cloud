Projeto desenvolvido durante o curso de Aprofundamento em Cloud da Proz Talent Cloud.

## Sobre o Projeto
Este projeto é um sistema simples para **gerenciar o cadastro de livros e filmes**, desenvolvido com uma **API em Node.js (Express)** e um **frontend em HTML/CSS**. E também utiliza alguns serviços da AWS, como **Cognito**, **AWS S3**, **AWS RDS**

## 🚀 Tecnologias Utilizadas
### Backend (API)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon) (para desenvolvimento)
- [Sequelize](https://sequelize.org/)

### Serviços AWS
- Cognito : Utilizado para gerenciar os usuários.
- AWS S3 :  Utilizado para armazenar arquivos.
- AWS RDS:  Banco de dados da AMAZON para armazenas os dados cadastrados. (Utilizado apenas para testes, a conexão com ele é parecida com a conexão a qualquer outro banco de dados.)

### Banco de dados
- MySQL

### Frontend
- HTML5
- CSS3
- JavaScript (interação básica com a API via Fetch)

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/manuely32/atividade_final_cloud.git
```
### 2️⃣ Entrar na pasta do projeto
```bash
cd nome-do-repositorio
```
### 3️⃣ Instalar as dependências do backend
```bash
cd api
npm install
```
### 4️⃣ Criar o arquivo .env

Crie um arquivo chamado .env dentro da pasta api/ conforme o arquivo .env_exemplo contido no projeto e adicione as variáveis necessárias.

### 5️⃣ Iniciar o servidor
```bash
npm run start ou yarn start
```
O servidor estará rodando em:
👉 http://localhost:3000

### 6️⃣ Abrir o frontend

Abra o arquivo frontend/index.html no navegador ou use uma extensão como Live Server (VS Code).

| Método | Rota      | Descrição              |
| :----: | :-------- | :--------------------- |
|   GET  | `/list_collection` | Lista todos os livros/filmes  |
|  POST  | `/collection` | Cadastra um novo livro |
|  POST  | `/register` | Cadastra um usuário  |
|  POST  | `/login` | Realiza o login do usuário |

### 🧠 Funcionalidades
- Cadastro, listagem de livros e filmes
- Comunicação entre frontend e backend via API REST
- Código organizado em rotas, controladores e modelos

### 👩‍💻 Autor(a)

Manuely Barbosa Guedes
📧 manuelyufpa@gmail.com

🌐 [GitHub](https://github.com/manuely32)
