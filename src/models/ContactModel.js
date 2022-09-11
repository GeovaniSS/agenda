const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  creationDate: { type: Date , default: Date.now() }
})

const contactModel = mongoose.model('Contact', contactSchema)

class Contact {
  constructor({ name="", email="", phone="" }) {
    this.name = name
    this.email = email
    this.phone = phone
    this.errors = []
    this.contact = null
  }

  // Métodos estático
  static async findContactById(id) {
    if(typeof id !== 'string') return
    return await contactModel.findById(id)
  }

  // Busca e ordena os contatos pelo nome em ordem crescente 
  static async findContats() {
    return await contactModel.find().sort({ name: 1 })
  }

  static async deleteContact(id) {
    if(typeof id !== 'string') return
    return await contactModel.findByIdAndDelete(id)
  }

  // Métodos de instância 
  async create() {
    this.validate()

    if(this.errors.length > 0) return

    this.contact = await contactModel.create({ name: this.name, email: this.email, phone: this.phone })
  }

  async edit(id) {
    if(typeof id !== 'string') return
    this.validate()

    if(this.errors.length > 0) return

    this.contact = await 
    contactModel.findByIdAndUpdate(
      id, { name: this.name, email: this.email, phone: this.phone }, { new: true }
    )
  }

  validate() {
    const emptyName = this.checkEmptyName()
    const IsFullName = this.checkFullName()
    const emailIsValid = this.validateEmail()
    const phoneIsValid = this.validatePhone()

    if(emptyName) return this.errors.push('O campo nome é obrigatório.')
    if(!IsFullName) return this.errors.push('Digite o seu nome completo.')
    if(!this.email && !this.phone) return this.errors.push('Informe um e-mail ou telefone para cadastrar um contato. ')
    if(this.email && !emailIsValid) return this.errors.push('E-mail inválido')
    if(this.phone && !phoneIsValid) return this.errors.push('Telefone inválido')
  }

  checkEmptyName() {
    if(this.name.trim().length === 0) return true
    return false
  }

  checkFullName() {
    if(!(this.name.split(' ').length > 1)) return false
    return true
  }

  validateEmail() {
    if(!validator.isEmail(this.email)) return false
    return true
  }

  validatePhone() {
    const regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$')
    this.phone = this.phone.replace(/[^0-9]+/g, '')

    return regex.test(this.phone)
  }
}

module.exports = Contact