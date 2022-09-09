const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if(req.session.user) return res.redirect('/')
  return res.render('login')
}

exports.login = async(req, res, next) => {
  try {
    const login = new Login(req.body)
    await login.login()

    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      return req.session.save(() => {
        return res.redirect('/login')
      })
    }

    req.session.user = login.user
    req.flash('success', 'Login efetuado com sucesso!')
    return req.session.save(() => {
      return res.redirect('/')
    })
  } catch(e) {
    console.log(e)
  }
}

exports.logout = (req, res, next) => {
  req.session.destroy()
  return res.redirect('/login')
}