const validator = require('validator')

export default class Contact {
  constructor() {
    this.form = document.querySelector('.form')
    this.nameField = document.querySelector('#name')
    this.emailField = document.querySelector('#email')
    this.phoneField = document.querySelector('#phone')
    this.formEvents()
  }

  formEvents() {
    this.form.addEventListener('submit', e => this.handleSubmit(e))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.removeErrorMessages()

    const formIsValid = this.validate()
    console.log(formIsValid)
    if(!formIsValid) return

    this.form.submit()
  }

  validate() {
    const email = this.emailField.value 
    const phone = this.phoneField.value

    const emptyFields = this.checkEmptyFields()
    const IsFullName = this.checkFullName()
    const emailIsValid = this.validateEmail()
    const phoneIsValid = this.validatePhone()
  
    if(emptyFields || !IsFullName || email && !emailIsValid || phone && !phoneIsValid ) return false
    return true
  }

  checkEmptyFields() {
    const name = this.nameField.value
    // const email = this.emailField.value
    // const phone = this.phoneField.value
    
    if(!name.trim().length) {
      this.createErrorMessage('O campo nome é obrigatório', this.nameField)
      return true
    }

    // if(!email.trim().length && !phone.trim().length) {
    //   alert('Informe um e-mail ou telefone para cadastrar um contato')
    //   return true
    // }

    return false
  }

  checkFullName() {
    const name = this.nameField.value

    if(!name.trim().length) return

    if(!(name.split(' ').length > 1)) {
      this.createErrorMessage('Digite o nome completo.', this.nameField)
      return false
    }

    return true
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

  validatePhone() {
    const phone = this.phoneField.value.replace(/[^0-9]+/g, '')
    const regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$')

    if(!phone.trim().length) return

    if(!regex.test(phone)) {
      this.createErrorMessage('Telefone inválido', this.phoneField)
      return false
    }

    return true
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