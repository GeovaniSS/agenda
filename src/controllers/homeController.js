const Contact = require('../models/ContactModel')

exports.index = async(req, res) => {
  try {
    const contacts = await Contact.findContats()
    return res.render('index', { contacts } )
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
} 

// exports.filter = async(req, res) => {

// }