const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  return res.render('login')
}

exports.login = async(req, res, next) => {
  try {
    const login = new Login(req.body)
    await login.login()

    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(() => res.redirect('/login'))
      return
    }

    req.session.user = login.user
    req.flash('success', 'Login efetuado com sucesso!')
    req.session.save(() => res.redirect('/'))
    return
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
}

exports.logout = (req, res, next) => {
  req.session.destroy()
  return res.redirect('/login')
}