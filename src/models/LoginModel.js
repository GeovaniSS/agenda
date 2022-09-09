const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const LoginSchema = new Schema({
  email: { type: String, required: true }, 
  password: { type: String, required: true }
})

const LoginModel = mongoose.model('Login', LoginSchema)

// Operações com o Banco de Dados devem ser feitas em um ambiente assíncrono (Promises)
// Métodos async (métodos assíncronos) que retornam Promises
// Os erros serão tratados no controller, renderizando uma página 404 para o usuário

class Login {
  constructor({ email, password }) {
    this.email = email
    this.password = password
    this.errors = [] 
    this.user = null
  }

  async login() {
    await this.validateLogin()
  }

  async register() {
    await this.validateRegistration()
    
    if(this.errors.length > 0) return

    await this.hashPassword()
    this.user = await LoginModel.create({ email: this.email, password: this.password })
  }

  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }

  async validateLogin() {
    const emptyFields = this.checkEmptyFields()
    const emailExists = await this.checkExistingEmail()
    const correctPassword = await this.checkPassword()

    if(emptyFields) return this.errors.push('Informe o seu e-mail e a sua senha para fazer o login.')
    if(!emailExists) return this.errors.push('O email inserido não pertence a uma conta. Verifique seu email e tente novamente.')
    if(!correctPassword) return this.errors.push('Sua senha está incorreta. Tente novamente.')
  }

  async validateRegistration() {
    const emptyFields = this.checkEmptyFields()
    const emailIsValid = this.validateEmail()
    const passwordIsValid = this.validatePassword()
    const emailExists = await this.checkExistingEmail()

    if(emptyFields) return this.errors.push('Os campos e-mail e senha são obrigatórios')
    if(emailExists) return this.errors.push('Email já cadastrado')
    if(!emailIsValid) return this.errors.push('Email inválido')
    if(!passwordIsValid) return this.errors.push(`A senha deve ter no mínimo 8 caracteres e possuir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial`)
  }

  async checkExistingEmail() {
    this.user = await LoginModel.findOne({ email: this.email })
    return this.user ? true : false
  }

  async checkPassword() {
    if(!this.user) return
    const hash = this.user.password
    return await bcrypt.compare(this.password, hash)
  }

  checkEmptyFields() {
    if(this.email.trim().length === 0 && this.password.trim().length === 0) return true
    return false
  }

  validateEmail() {
    if(!validator.isEmail(this.email)) return false
    return true
  }

  validatePassword() {
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#;$%*(){}_+^&]*$/ 
    if(!this.password.trim().length >= 8) return false
    if(!regex.exec(this.password)) return false
    return true
  }
}

module.exports = Login