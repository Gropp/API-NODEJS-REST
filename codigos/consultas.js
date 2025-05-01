// importa os modelos
const { where } = require('sequelize');
const db = require('../models/index');
const { raw } = require('body-parser');
// instanciamos os operadores do sequelize like, maior, menor...
// estudar os operadores https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
const Op = db.Sequelize.Op;
// instancia a tabela Pessoa
const Pessoa = db.Pessoa;

// consultar pessoas com id = 500
// retorna somente 1 registro
function encontrarPorId(id) {
    Pessoa.findByPk(id).then(pessoa => {
        console.log('\n \n')
        // retorna em formato JSON
        console.log(JSON.stringify(pessoa))
    })
}

// encontrarPorId(500);

// consultar nome e sobrenome pessoas com o nome igual a jerrie
// retorna somente 1 registro
function encontrarPorNome(nome) {
    Pessoa.findOne({
        attributes: ['nome', 'sobrenome'],
        where: {
            nome: nome
        },
        //limpar a consulta sem usar o JSON
        raw: true,
    }).then(pessoa => {
        console.log('\n \n')
        // retorna em formato JSON
        console.log(pessoa)
    })
}

// encontrarPorNome('jerrie');

// consultar pessoas com id in (1,2,3,4)
// essa consulta retorna varios registros
function encontrarComIdIn(arrayids) {
    Pessoa.findAll({
        where: {
            // passando um array de ids, o proprio sequelize trasnforma isso em um IN
            id: arrayids,
        },
        //limpar a consulta sem usar o JSON
        raw: true,
    }).then(pessoa => {
        console.log('\n \n')
        // retorna em formato JSON
        console.log(pessoa)
    })
}

// encontrarComIdIn([1,2,3,4,5]);

// consultar pessoas com paginacao = limite 100 offset 990
// essa consulta retorna varios registros
function encontrarComOffsetLimite() {
    Pessoa.findAll({
        // começa pelo registro 990
        offset: 990, 
        // traz dez registros
        limit: 10,
        // limpar a consulta sem usar o JSON
        raw: true,
    }).then(pessoa => {
        console.log('\n \n');
        // retorna em formato JSON
        console.log(pessoa);
    })
}

// encontrarComOffsetLimite();

// consultar 10 pessoas onde o nome comece por Ro
// essa consulta retorna varios registros
// essa consulta usa OPERADORES
// virgulas no where equivalem ao E
function encontrarComLike(str) {
    Pessoa.findAll({
        where: {
            nome: {
                [Op.like]: str
            },
        },
        // traz dez registros
        limit: 10,
        // limpar a consulta sem usar o JSON
        raw: true,
    }).then(pessoa => {
        console.log('\n \n');
        // retorna em formato JSON
        console.log(pessoa);
    })
}

// encontrarComLike('Ro%');

// consultar as 5 primeiras pessoas da lista que tenha o sobrenome Harpham
// essa consulta retorna varios registros
// essa consulta usa OPERADORES
function encontrarPorSobrenome(sobrenome) {
    Pessoa.findAll({
        where: {
            // operador OU
            [Op.or]: [
                {
                    id: {
                        // menor iqual a
                        [Op.lte]: 5
                    }
                },
                {
                    sobrenome: sobrenome
                }
            ]
        },
        // traz dez registros
        limit: 10,
        // limpar a consulta sem usar o JSON
        raw: true,
    }).then(pessoa => {
        console.log('\n \n');
        // retorna em formato JSON
        console.log(pessoa);
    })
}

encontrarPorSobrenome('Harpham');