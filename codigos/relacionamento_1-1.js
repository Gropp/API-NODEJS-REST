// instancia os modelos
const db = require('../models/index');
// cria os objetos para a manipulacao das tabelas
const Pessoa = db.Pessoa;
const Endereco = db.Endereco;

// função assincrona - executa em 2 plano
async function adicionarEndereco(endereco) {
    const enderecoCriado = await Endereco.create(endereco);
    console.log('\n \n');
    // mostra o retorno da funcao
    console.log(enderecoCriado);
}

// como nos models tem o belongTo e o HasOne
// nos chegamos na pessoa atraves do endereço
async function procurarEndereco(enderecoId) {
    const endereco = await Endereco.findOne({
        where: {id: enderecoId},
        // adicionando a tabela estrangeira, no caso é o model Pessoa
        // assim o retorno tambem trata o registro ligado pela chave estrangeira
        include: [{
            model: Pessoa,
        }],
        // habilitando o log
        logging: true,
        raw: true,
        // aninha os objetos relacionados pela chave estrangeira
        nest: true,
    })
    console.log(endereco);
}

// como nos models tem o belongTo e o HasOne
// se nos comentarmos o HasOne no model Pessoa nos invertemos a ordem
// e conseguimos chegar no endereço atraves da pessoa
async function procurarPessoaComEndereco() {
    // findOne traz somente um, o primeiro
    // findAll traz todas as pessoas, mesmo sem endereço
    const pessoa = await Pessoa.findAll({
        // include inclui/aninha um objeto dentro do outro
        // adicionando a tabela estrangeira, no caso é o model Pessoa
        // assim o retorno tambem trata o registro ligado pela chave estrangeira
        // uma clausula where: {...} aqui, filtra pessoas!
        include: [{
            model: Endereco,
            // essa opção faz com que somente as pessoas que estejam no model endereço, em outras palavras, que tenha um endereço, seja mostrado. Converte um left join em um inner join
            required: true,
            // uma clausula where: {...} aqui, filtra endereços!
        }],
        // melhora a visualização
        raw: true,
        // aninha os objetos relacionados pela chave estrangeira
        nest: true,
    })
    console.log(pessoa);
}


// chamando a função de criar endereço e relacionar com a pessoa
// adicionarEndereco({
//     pessoaId: 1,
//     rua:  'Rua dos bobos',
//     numero: '0',
//     complemento: 'perto de nada',
//     bairro: 'nenhum',
//     CEP: '80.000-000',
//     cidade: 'Natal',
//     estado: 'Solido'
// });

// chamando a função de encontrar o endereço

// procurarEndereco(1);
procurarPessoaComEndereco();