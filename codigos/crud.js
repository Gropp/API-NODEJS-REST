// importa os modelos
const { where } = require('sequelize');
const db = require('../models/index');
// instancia a tabela Pessoa
const Pessoa = db.Pessoa;

// inserir registros na tabela Pessoa
function criarPessoa() {
    Pessoa.create({
        nome: 'Jose',
        sobrenome: 'Silva',
        cpf: '000.000.000-00',
        rg: '1.111.111-1',
        email: 'jose.silva@gmail.com'
    }).then(pessoa => console.log(pessoa))
};

// atualiza um registro da tabela recebendo o ID
function atualizarPessoa(id) {
    Pessoa.update({
        cpf: '123.321.312-10',
        rg: '9.909.898-9',
    }, {
        where: {
            id
        }
    }).then(pessoa => console.log(pessoa))
};

// deletar um registro da tabela recebendo o ID
function deletarPessoa(id) {
    Pessoa.destroy({
        where: {
            id
        }
    }).then(pessoa => console.log(pessoa))
};

// criarPessoa();
// atualizarPessoa(1);
// deletarPessoa(3);
