const express = require('express')
const route = express.Router() 
const homeController = require('./src/controllers/homeController') 
const loginController = require('./src/controllers/loginController')
const registerController = require('./src/controllers/registerController')

// Rotas da Home
route.get('/', homeController.index)

// Rotas de Login
route.get('/login', loginController.index)
route.post('/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Rotas de Cadastro
route.get('/register', registerController.index)
route.post('/register', registerController.register)

module.exports = route