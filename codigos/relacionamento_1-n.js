// instancia os modelos
const db = require('../models/index');
// cria os objetos para a manipulacao das tabelas
const Pessoa = db.Pessoa;
const Telefone = db.Telefone;

async function adicionarTelefone(telefone) {
    const telefoneCriado = await Telefone.create(telefone);
    console.log(telefoneCriado);
}

adicionarTelefone({
    pessoaId : 3,
    numero : '11987679878'
})