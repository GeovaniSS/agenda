const Contact = require('../models/ContactModel')

exports.index = async(req, res, next) => {
  try {
    if(req.params.id) {
      const contact = await Contact.findContactById(req.params.id)
      return res.render('contact', { contact })
    }
  
    return res.render('contact', { contact: {} })
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
}

exports.create = async(req, res, next) => {
  try {
    const contact = new Contact(req.body)
    await contact.create()
  
    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect('/contact'))
      return
    }
  
    req.flash('success', 'Contato criado com sucesso!')
    req.session.save(() => res.redirect('/'))
    return 
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
}

exports.edit = async(req, res, next) => {
  try {
    const contact = new Contact(req.body)
    await contact.edit(req.params.id)

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect(`/contact/${req.params.id}`))
      return
    }

    req.flash('success', 'Contato editado com sucesso!')
    req.session.save(() => res.redirect(`/`))
    return
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
}

exports.delete = async(req, res, next) => {
  try {
    await Contact.deleteContact(req.params.id)
    
    req.flash('success', 'Contato deletado com sucesso!')
    req.session.save(() => res.redirect('/'))
    return
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
}