import express from 'express'
import multer from 'multer'
import UsersController from './Controllers/UsersController.js'
import './database/index.js'
import cors from 'cors'

// Instanciando o express
const app = express() //Gerenciamento de rotas

// Instanciand o multer
const upload = multer() // lib utilizada para tratar o upload de arquivos.

//função que permite que uma aplicação web acesse recursos de outros domínios.
app.use(cors())

//permite solicitações no formato JSON
app.use(express.json())

//especificando a rota de cadastro do usuário
app.post('/register', upload.single('image'), UsersController.register)

//especificando a rota de login do usuário
app.post('/login', UsersController.login)

//Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando'))