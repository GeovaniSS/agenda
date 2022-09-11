const validator = require('validator')

export default class Login {
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
      this.createErrorMessage(`Digite um e-mail`, this.emailField)
      emptyFields = true
    }

    if(!password.trim().length) {
      this.createErrorMessage(`Digite uma senha`, this.passwordField)
      emptyFields = true
    }

    return emptyFields
  }

  validateEmail() {
    const email = this.emailField.value

    if(!email.trim().length) return

    if(!validator.isEmail(email)) {
      this.createErrorMessage('O email inserido não pertence a uma conta. Verifique seu email e tente novamente.', this.emailField)
      return false
    }

    return true
  }

  validatePassword() {
    const password = this.passwordField.value
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#;$%*(){}_+^&]*$/ 
    let passwordIsValid = true

    if(!password.trim().length) return

    if(!(password.trim().length >= 8) || !regex.exec(password)) {
      this.createErrorMessage('Sua senha está incorreta. Tente novamente.', this.passwordField)
      passwordIsValid = false
    }

    return passwordIsValid
  }

  createErrorMessage(msg, field) {
    const error = document.createElement('small')
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