exports.paginaInicial = (req, res) => {
  res.render('index', {
    titulo: 'Um título qualquer',
    numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  })
} 

exports.trataPost = (req, res) => {
  res.send(`<h1> Seja bem-vindo ${req.body.nome} </h1>`)
}