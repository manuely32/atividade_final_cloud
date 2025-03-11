import express from 'express'
import multer from 'multer'
import UsersController from './Controllers/UsersController.js'
import CollectionController from './Controllers/CollectionController.js'
import './database/index.js'
import cors from 'cors'

// Instanciando o express
const app = express() //Gerenciamento de rotas

// Instanciando o multer
const upload = multer() // lib utilizada para tratar o upload de arquivos.

//função que permite que uma aplicação web acesse recursos de outros domínios.
app.use(cors())

//permite solicitações no formato JSON
app.use(express.json())

//especificando a rota de cadastro do usuário
app.post('/register', upload.single('image'), UsersController.register)

//especificando a rota de login do usuário
app.post('/login', UsersController.login)

//especificando a rota de cadastro do filme/livro
app.post('/collection', CollectionController.create)

//especificando a rota de listagem de filmes/livros
app.get('/list_collection', CollectionController.list)

//especificando a rota de busca de um item de filmes/livros
app.get('/list_collection', CollectionController.show)

//especificando a rota para exclusão de um item de filmes/livros
app.put('/collection', CollectionController.update)

//especificando a rota para exclusão de um item de filmes/livros
app.delete('/collection', CollectionController.delete)


//Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando'))