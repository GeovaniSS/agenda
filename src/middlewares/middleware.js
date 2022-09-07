// Middlawares Globais
// Todas as requisições em todas as rotas e métodos de roteamento passam nos Middlewares abaixo

exports.checkCsrfError = (err, req, res, next) => {
  // Se ocorrer o erro do CSRF, renderize a página 404
  if(err.code === 'EBADCSRFTOKEN') {
    return res.render('404')
  }
}

exports.csrfMiddleware = (req, res, next) => {
  // Cria o CSRF Token que será enviado nas requisições POST de formulários
  res.locals.csrfToken = req.csrfToken()
  next()
}