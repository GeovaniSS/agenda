const Login = require('../models/LoginModel')

exports.index = (req, res, next) => {
  return res.render('register')
}

exports.register = async(req, res, next) => {
  try {
    const login = new Login(req.body)
    await login.register()
  
    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(() => res.redirect('/register'))
      return
    }

    req.flash('success', 'Cadastro realizado com sucesso!')
    req.session.save(() => res.redirect('/login'))
    return
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
}