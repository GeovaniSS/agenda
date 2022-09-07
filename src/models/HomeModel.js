const mongoose = require('mongoose')
const { Schema } = mongoose

// Modelagem dos dados 
const HomeSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: String
})

// Criação do Model 
const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel