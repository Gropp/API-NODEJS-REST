// instanciando o express html server
const express = require('express')
const app = express()
// importando a biblioteca para manipular diferentes tipos de objetos
const bodyParser = require('body-parser')
const port = 3030

// chamando a biblioteca para dentro do app como um middleware
app.use(bodyParser.urlencoded({ extended: true}))
// setando para o padrao json
app.use(bodyParser.json())

// rota padrao do tipo GET - no raiz /
app.get('/', (reg, res) => {
    res.send('Hello World!')
})
// rota /usuarios na url no rest voce sempre usa o endpoint no plural
// retorna todos os usuarios
app.get('/usuarios/', (reg, res) => {
    res.send(
    [
        {
            nome: 'João'
        },
        {
            nome:'Maria'
        }
    ])
})

// retorna usuario por id ** o ~~ é para converter os paramentros da requisicao em string
app.get('/usuarios/:id', (req, res) => {
    const usuarios = [
        {
            id: 1,
            nome: 'João',
            email: 'joao@gmail.com'
        },
        {
            id: 2,
            nome:'Maria',
            email: 'maria@gmail.com'
        }
    ]
    // retorna o usuario que se encaixa no filtro find
    // transforma o id para comparacao
    const usuario = usuarios.find(user => ~~req.params.id === user.id);
    res.send(usuario)
})

// novos finds
// um find para trazer somente se o usuario e a senha estiver iguais ao cadastro
app.get('/usuarios/:email/:senha', (req, res) => {
    const usuarios = [
        {
            id: 1,
            nome: 'João',
            email: 'joao@gmail.com',
            senha: '123'
        },
        {
            id: 2,
            nome:'Maria',
            email: 'maria@gmail.com',
            senha: '12345'
        }
    ]
    // retorna o usuario que se encaixa no filtro find
    const usuario = usuarios.find(user => req.params.email === user.email && req.params.senha === user.senha);
    res.send(usuario)
})

// direto
app.get('/carros/', (reg, res) => {
    res.send(
    [
        {
            nome: 'ferrari'
        },
        {
            nome:'Audi'
        }
    ])
})

// define a porta de pool 
app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})