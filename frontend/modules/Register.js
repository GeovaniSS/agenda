const validator = require('validator')

export default class Register {
  constructor() {
    this.form = document.querySelector('.form')
    this.emailField = document.querySelector('#email')
    this.passwordField = document.querySelector('#password')
    this.formEvents()
  }

  formEvents() {
    this.form.addEventListener('submit', e => this.handleSubmit(e))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.removeErrorMessages()

    const formIsValid = this.validate()
    if(!formIsValid) return

    this.form.submit()
  }

  validate() {
    const emptyFields = this.checkEmptyFields()
    const emailIsValid = this.validateEmail()
    const passwordIsValid = this.validatePassword()

    if(emptyFields || !emailIsValid || !passwordIsValid) return false
    return true
  }

  checkEmptyFields() {
    const email = this.emailField.value
    const password = this.passwordField.value
    let emptyFields = false

    if(!email.trim().length) {
      this.createErrorMessage(`O campo e-mail é obrigatório`, this.emailField)
      emptyFields = true
    }

    if(!password.trim().length) {
      this.createErrorMessage(`O campo senha é obrigatório`, this.passwordField)
      emptyFields = true
    }

    return emptyFields
  }

  validateEmail() {
    const email = this.emailField.value

    if(!email.trim().length) return

    if(!validator.isEmail(email)) {
      this.createErrorMessage('Email inválido', this.emailField)
      return false
    }

    return true
  }

  validatePassword() {
    const password = this.passwordField.value
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#;$%*(){}_+^&]*$/ 
    let passwordIsValid = true

    if(!password.trim().length) return

    if(!(password.trim().length >= 8)) {
      this.createErrorMessage('A senha deve ter no mínimo 8 caracteres', this.passwordField)
      passwordIsValid = false
    }

    if(!regex.exec(password)) {
      this.createErrorMessage('A senha deve possuir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial', this.passwordField)
      passwordIsValid = false
    }

    return passwordIsValid
  }

  createErrorMessage(msg, field) {
    const error = document.createElement('small')
    field.classList.add('error')
    error.classList.add('error-message')
    error.innerText = msg

    field.classList.add('error')
    field.value = ''
    
    const formGroup = field.parentElement
    formGroup.appendChild(error)
  }

  removeErrorMessages() {
    const errors = document.querySelectorAll('.error-message')
    const fields = document.querySelectorAll('.form-input.error')
    
    errors.forEach(erro => erro.remove())
    fields.forEach(field => field.classList.remove('error'))
  }
}