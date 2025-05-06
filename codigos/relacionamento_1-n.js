// instancia os modelos
const endereco = require('../models/endereco');
const db = require('../models/index');
// cria os objetos para a manipulacao das tabelas
const Pessoa = db.Pessoa;
const Telefone = db.Telefone;
const Endereco = db.Endereco;

async function adicionarTelefone(telefone) {
    const telefoneCriado = await Telefone.create(telefone);
    console.log(telefoneCriado);
}


async function encontrarPessoaComTelefone(idPessoa, idTelefone, idEndereco) {
    const pessoa = await Pessoa.findOne({
        where: {id: idPessoa},
        include: [
            {
            // busca na tabela telefone
            model: Telefone,
                where: { id : idTelefone}
            },
            {
            // busca na tabela endereço
            model: Endereco,
                where: { id: idEndereco}
            }
        ]
    })
    // como o retorno desta função é um array, usar raw: true e nest: true, nao fuciona, por isso que se usa a formatação json - mas se for construir uma API RESTFUL nao precisa se preocupar com esse retorno pois a propria API cuida dessa formatação.
    // fazemos isso pois estamos querendo ver o resultado no terminal
    console.log(JSON.parse(JSON.stringify(pessoa)))
}

// adicionarTelefone({
//      pessoaId : 1,
//      numero : '119654327890'
// });

encontrarPessoaComTelefone(1,4,1);