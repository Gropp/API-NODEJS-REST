// instanciando o express html server
const express = require('express')
const app = express()
// importando a biblioteca para manipular diferentes tipos de objetos
const bodyParser = require('body-parser');
// variavel da porta pool
const port = 3030
// array de usuarios - escopo global
const usuarios = [];

// chamando a biblioteca para dentro do app como um middleware
app.use(bodyParser.urlencoded({ extended: true}))
// setando para o padrao json
app.use(bodyParser.json())

app.get('/usuarios', (req, res) => {
    res.send(usuarios);
})

// POST - []
// adicionando no objeto usuarios
// req.body - corpo do que vai ser enviado
app.post('/usuarios', (req, res) => {
    //res.send(req.body.nome);
    // joga o valor da requisicao em uma variavel
    // [varios elementos detro de ]
    const usuario = req.body;
    // coloca esse valor no array de usuarios - append
    usuarios.push(usuario);
    // devolve o usuario criado
    res.send(usuario)
})

// PUT atualiza uma informacao
// SEMPRE O REQ.PARANS VEM COMO STRING
// para converter para inteiro, para comparar com outro inteiro, como é o caso do ID, se usa ~~
app.put('/usuarios/:id', (req, res) => {
    // como é uma atualizacao, é precisa achar o usuario cadastrado
    const index = usuarios.findIndex(user => user.id === ~~req.params.id);
    console.log(index);
    // req.body só é visivel no POST e no PUT(PATCH), nos outros métodos nao sao visiveis/usados
    const usuario = req.body;
    // a funcao splice dado um indice, ele apaga 1 registro (atual) e sobrescreve na mesma posicao o conteudo do objeto usuario - ou seja, ela faz UGRADE de TODO o REGISTRO e nao de uma coluna/atributi
    usuarios.splice(index, 1, usuario);
    // apos substituir retorna o novo conteudo no mesmo index
    res.send(usuario);
})

app.delete('/usuarios/:id', (req, res) => {
    // como é uma atualizacao, é precisa achar o usuario cadastrado
    const index = usuarios.findIndex(user => user.id === ~~req.params.id);
    console.log(index);
    // req.body só é visivel no POST e no PUT(PATCH), nos outros métodos nao sao visiveis/usados
    const usuario = req.body;
    // a funcao splice dado um indice, ele apaga 1 registro (atual) e sobrescreve na mesma posicao o conteudo do objeto usuario - ou seja, ela faz UGRADE de TODO o REGISTRO e nao de uma coluna/atributi
    usuarios.splice(index, 1);
    // apos substituir retorna o novo conteudo no mesmo index
    res.send(usuario);
})

// define a porta de pool 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})