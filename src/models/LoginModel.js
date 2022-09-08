const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const LoginSchema = new Schema({
  email: { type: String, required: true }, 
  password: { type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema)

// Operações com o Banco de Dados devem ser feitas em um ambiente assíncrono (Promises)
// Métodos async (métodos assíncronos) que retornam Promises

class Login {
  constructor({ email, password }) {
    this.email = email
    this.password = password
    this.errors = [] 
    this.user = null
  }

  async register() {
    await this.validate()
    if(this.errors.length > 0) return

    try {
      await this.hashPassword()
      this.user = await LoginModel.create({ email: this.email, password: this.password })
    } catch(e) {
      console.log(e)
    }
  }

  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }

  async validate() {
    const emptyFields = this.checkEmptyFields()
    const emailIsValid = this.validateEmail()
    const passwordIsValid = this.validatePassword()
    const existingEmail = await this.checkExistingEmail()

    if(emptyFields) this.errors.push('Os campos e-mail e senha são obrigatórios')
    if(!emptyFields && existingEmail) this.errors.push('Email já cadastrado')
    if(!emptyFields && !emailIsValid) this.errors.push('Email inválido')
    if(!emptyFields && !passwordIsValid) this.errors.push(`A senha deve ter no mínimo 8 caracteres e possuir pelo menos 
    uma letra maiúscula, uma letra minúscula, um número e um caracter especial`)
  }

  checkEmptyFields() {
    if(this.email.trim().length === 0 && this.password.trim().length === 0) return true
    return false
  }

  async checkExistingEmail() {
    try {
      // const logins = await LoginModel.find({ email: this.email })
      const userExists = await LoginModel.findOne({ email: this.email })
      return userExists ? true : false
    } catch(e) {
      console.log(e)
    }
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