// importa os modelos
const db = require('../models/index');
// instancia o sequelize
// estudar raw queries https://sequelize.org/docs/v6/core-concepts/raw-queries/
const sequelize = db.sequelize;


// SOMENTE USAR O METODO RAW SE A COMPLEXIDADE DA CONSULTA FOR MUITA ALTA, SE TIVER MUITAS TABELAS ENVOLVIDAS E MUITAS RELACOES.

// consultar pessoas por id
function encontrarPorId(){
    // recebe dois parametros (consulta, parametros)
    sequelize.query(
        'SELECT * FROM pessoas where id = 500',
        {
            // define o tipo do sequelize
            type: sequelize.QueryTypes.SELECT,
            // retorna em ARRAY no formato JSON
            raw: true,
            // transforma o array em UM OBJETO, muito util quando sabemos que o retorno será único
            plain: true
        }
    ).then(pessoa => {
        console.log('\n \n')
        console.log(pessoa);
    })
}

// encontrarPorId();

// consultar pessoas com id = 500
function encontrarPorId2(id){
    // recebe dois parametros (consulta, parametros)
    sequelize.query(
        'SELECT * FROM pessoas where id = :id',
        {
            // substitui o argumento da função na query BIND :id
            replacements: {id: id},
            // define o tipo do sequelize
            type: sequelize.QueryTypes.SELECT,
            // retorna em ARRAY no formato JSON
            raw: true,
            // transforma o array em UM OBJETO, muito util quando sabemos que o retorno será ÚNICO
            plain: true
        }
    ).then(pessoa => {
        console.log('\n \n')
        console.log(pessoa);
    })
}

// encontrarPorId2(501);

// consultar pessoas com o nome Jarrie
function encontrarPorNome(nome){
    // recebe dois parametros (consulta, parametros)
    sequelize.query(
        // não precisa usar template string - sinal de crase
        // IMPORTANTE: como nome é uma string, para nao dar problemas com as aspas simples do parametro, devemos colocar a chamado do select com aspas duplas!
        "SELECT * FROM pessoas where nome = :nome",
        {
            // substitui o argumento da função na query BIND :id
            replacements: {nome: nome},
            // define o tipo do sequelize
            type: sequelize.QueryTypes.SELECT,
            // retorna em ARRAY no formato JSON
            raw: true,
            // transforma o array em UM OBJETO, muito util quando sabemos que o retorno será ÚNICO
            plain: true
        }
    ).then(pessoa => {
        console.log('\n \n')
        console.log(pessoa);
    })
}

// encontrarPorNome('jerrie');

// consultar pessoas com os ids nos ranges 1,2,3,4
function encontrarPorRangeId(arrayIds){
    // recebe dois parametros (consulta, parametros)
    sequelize.query(
        // não precisa usar template string - sinal de crase
        // IMPORTANTE: como nome é uma string, para nao dar problemas com as aspas simples do parametro, devemos colocar a chamado do select com aspas duplas!
        "SELECT * FROM pessoas WHERE id IN (:arrayIds)",
        {
            // substitui o argumento da função na query BIND, como os nomes do argumento e o usado para escrever o parametro do SELECT sao os mesmos, nao precisa repetir usando :
            replacements: { arrayIds },
            // define o tipo do sequelize
            type: sequelize.QueryTypes.SELECT,
            // retorna em ARRAY no formato JSON
            raw: true
        }
    ).then(pessoa => {
        console.log('\n \n')
        console.log(pessoa);
    })
}

// chamar a funcao passando um array []
// encontrarPorRangeId([1,2,3,4]);

// consultar pessoas com limit e offset
function encontrarComLimitOffSet(LM, OS){
    // recebe dois parametros (consulta, parametros)
    sequelize.query(
        // não precisa usar template string - sinal de crase
        // IMPORTANTE: como nome é uma string, para nao dar problemas com as aspas simples do parametro, devemos colocar a chamado do select com aspas duplas!
        "SELECT * FROM pessoas LIMIT :LM OFFSET :OS",
        {
            // substitui o argumento da função na query BIND, como os nomes do argumento e o usado para escrever o parametro do SELECT sao os mesmos, nao precisa repetir usando :
            replacements: { LM,OS },
            // define o tipo do sequelize
            type: sequelize.QueryTypes.SELECT,
            // retorna em ARRAY no formato JSON
            raw: true
        }
    ).then(pessoa => {
        console.log('\n \n')
        console.log(pessoa);
    })
}

// chama a funcao passando o limit e o offset
// encontrarComLimitOffSet(20, 980);

// consultar pessoas com limit e offset
// vamos usar o replacemente como um objeto com os parametros
function encontrarComLike(objeto){
    // recebe dois parametros (consulta, parametros)
    sequelize.query(
        // não precisa usar template string - sinal de crase
        // IMPORTANTE: como nome é uma string, para nao dar problemas com as aspas simples do parametro, devemos colocar a chamado do select com aspas duplas!
        "SELECT * FROM pessoas WHERE nome LIKE :nome LIMIT :LM",
        {
            // substitui o argumento da função na query BIND, como os nomes do argumento e o usado para escrever o parametro do SELECT sao os mesmos, nao precisa repetir usando :
            replacements: objeto,
            // define o tipo do sequelize
            type: sequelize.QueryTypes.SELECT,
            // retorna em ARRAY no formato JSON
            raw: true
        }
    ).then(pessoa => {
        console.log('\n \n')
        console.log(pessoa);
    })
}

// encontrarComLike({ nome: 'Ro%', LM: 2 });

// consultar pessoas com o sobrenome Jarrie
function encontrarPorSobrenome(replacements){
    // recebe dois parametros (consulta, parametros)
    sequelize.query(
        // não precisa usar template string - sinal de crase
        // IMPORTANTE: como nome é uma string, para nao dar problemas com as aspas simples do parametro, devemos colocar a chamado do select com aspas duplas!
        "SELECT * FROM pessoas where id <= :id or sobrenome = :sobrenome",
        {
            // substitui o argumento da função na query BIND :id e :sobrenome
            // como o nome do arqumento da função é replacement e os nomes das variaveis sao os mesmo que os binds, nao precisa especificar ao chamar o replacement
            replacements,
            // define o tipo do sequelize
            type: sequelize.QueryTypes.SELECT,
            // retorna em ARRAY no formato JSON
            raw: true
        }
    ).then(pessoa => {
        console.log('\n \n')
        console.log(pessoa);
    })
}

// durante o programa eu crio o objeto dos argumentos das queries:
const objeto = {
    id: 5,
    sobrenome: 'Harpham'
}

// chama a função passando o objeto
// encontrarPorSobrenome(objeto);