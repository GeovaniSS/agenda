const express = require('express')
const route = express.Router() 

const homeController = require('./src/controllers/homeController') 
const loginController = require('./src/controllers/loginController')
const registerController = require('./src/controllers/registerController')
const contactController = require('./src/controllers/contactController')

const { messages, userLoggedOut, loginRequired } = require('./src/middlewares/middleware') 

// Middleware de Roteamento Global
route.use(messages)

// Rotas da Home
route.get('/', homeController.index)

// Rotas de Login e Logout
route.get('/login', userLoggedOut, loginController.index)
route.post('/login', userLoggedOut, loginController.login)
route.get('/login/logout', loginController.logout)

// Rotas de Cadastro
route.get('/register', userLoggedOut, registerController.index)
route.post('/register', userLoggedOut, registerController.register)

// Rotas de Contato (CRUD)
route.get('/contact/:id?', loginRequired, contactController.index)
route.post('/contact/create', loginRequired, contactController.create)
route.post('/contact/:id/edit', loginRequired, contactController.edit)
route.get('/contact/:id/delete', loginRequired, contactController.delete)

module.exports = route