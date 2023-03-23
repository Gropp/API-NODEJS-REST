// instanciando o express html server
const express = require('express')
const app = express()
// importando a biblioteca para manipular diferentes tipos de objetos
const bodyParser = require('body-parser')
// variavel da porta pool
const port = 3030
// array de usuarios - escopo global
const usuarios = []

// chamando a biblioteca para dentro do app como um middleware
app.use(bodyParser.urlencoded({ extended: true}))
// setando para o padrao json
app.use(bodyParser.json())

// adicionando no objeto usuarios
// req.body - corpo do que vai ser enviado
app.post('/usuarios', (req, res) => {
    //res.send(req.body.nome);
    // joga o valor da requisicao em uma variavel
    const usuario = req.body;
    // coloca esse valor no array de usuarios - append
    usuarios.push(usuario);
    // devolve o usuario criado
    res.send(usuario)
})

app.get('/usuarios', (req, res) => {
    res.send(usuarios);
})


// define a porta de pool 
app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})