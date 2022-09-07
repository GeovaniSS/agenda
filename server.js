require('dotenv').config()
const express = require("express")
const app = express()

// Conexão com a Base de Dados
const mongoose = require('mongoose')
const connectionString = process.env.CONNECTIONSTRING
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit('pronto')
  })
  .catch(err => console.log(err))

// Session
const session = require('express-session')
const MongoStore = require('connect-mongo') // Salva as sessões no Banco de Dados MongoDB
const flash = require('connect-flash') // Flash Messages (Mensagens que são salvas na sessão)

// Objeto de configurações do Session Middleware
const sessionOptions = {
  secret: process.env.SECRET,
  store: new MongoStore({ 
    client: mongoose.connection.getClient(),
    dbName: process.env.DBNAME,
    collectionName: "sessions"
  }),
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    sameSite: 'lax' // O navegador só enviará o cookie em requisições cross-site seguras (GET)
  }
}

const routes = require('./routes')
const path = require('path')

// Segurança
const helmet = require('helmet')
const csrf = require('csurf')
const { checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware') 

app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Carregando arquivos estáticos do diretório public
app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(session(sessionOptions))
app.use(flash())
app.use(csrf())

// Middleware para tratar o erro CSRF (Ocorre quando um formulário é enviado sem o CSRF Token)
app.use(checkCsrfError)

// Middleware que cria e injeta o CSRF Token para todas as views
app.use(csrfMiddleware)

// Rotas do routes
app.use(routes)

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000')
    console.log(`Servidor executando na porta ${3000}`)
  })
})