import express from 'express'
import multer from 'multer'
import UsersController from './Controllers/UsersController.js'
import CollectionsController from './Controllers/CollectionsController.js'

import './database/index.js'
import cors from 'cors'
import TypesController from './Controllers/TypesController.js'
import CategoryController from './Controllers/CategoryController.js'

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

app.post('/confirmation_user', UsersController.confirmationUSer)

//especificando a rota de login do usuário
app.post('/login', UsersController.login)

//especificando a rota de cadastro da coleção
app.post('/collection', upload.single('imagem'), CollectionsController.create)

//especificando a rota de listagem de filmes/livros
app.get('/list_collection', CollectionsController.list)

//especificando a rota de busca de um item de filmes/livros
app.get('/list_collection/:id', CollectionsController.show)

//especificando a rota para edição de um item de filmes/livros
app.put('/collection', CollectionsController.update)

//especificando a rota para exclusão de um item de filmes/livros
app.delete('/collection', CollectionsController.delete)

// rotas para a entidade types
app.get('/types', TypesController.list)

// rotas para a entidade category
app.get('/category', CategoryController.list)




//Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando'))