// importa os modelos
const { where } = require('sequelize');
const db = require('../models/index');
// instancia a tabela Pessoa
const Pessoa = db.Pessoa;

// função para incluir varios registros de uma vez na base de dados
function criarPessoas() {
    const pessoas = [
        {
            nome: 'Joao',
            sobrenome: 'Villa',
            cpf: '456.345.543-90',
            email: 'joao.villa@gmail.com',
            rg: '8.876.123-0',
        },
        {
            nome: 'Pedro',
            sobrenome: 'Villa',
            cpf: '456.345.543-90',
            email: 'pedro.villa@gmail.com',
            rg: '8.876.123-0',
        },
        {
            nome: 'Paula',
            sobrenome: 'Villa',
            cpf: '456.345.543-90',
            email: 'paula.villa@gmail.com',
            rg: '8.876.123-0',
        },
        {
            nome: 'Anna',
            sobrenome: 'Villa',
            cpf: '456.345.543-90',
            email: 'anna.villa@gmail.com',
            rg: '8.876.123-0',
        },
        {
            nome: 'Paulo',
            sobrenome: 'Villa',
            cpf: '456.345.543-90',
            email: 'paulo.villa@gmail.com',
            rg: '8.876.123-0',
        },
    ]
    // chamo a instancia da base de dados Pessoa com o atributo bulkCreate recebendo o objeto pessoas
    Pessoa.bulkCreate(pessoas).then(pessoas => console.log(pessoas))
};

criarPessoas();