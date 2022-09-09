// Middlawares Globais
// Todas as requisições em todas as rotas e métodos de roteamento passam nos Middlewares abaixo

exports.checkCsrfError = (err, req, res, next) => {
  if(err) return res.render('404')
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  // Cria o CSRF Token que será enviado nas requisições POST de formulários
  res.locals.csrfToken = req.csrfToken()
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.user = req.session.user
  next()
}