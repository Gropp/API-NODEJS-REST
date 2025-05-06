'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relação 1 - 1
      // esse endereço pertence a uma pessoa
      // sempre a tabela que tem a chave primaria - se referencia
      // é belongsTo (pertence)
      // endereço tem uma chave estrangeira que pertence a pessoa
      Endereco.belongsTo(models.Pessoa, {foreignKey: 'pessoaId'})
    }
  }
  Endereco.init({
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    CEP: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Endereco',
    tableName: 'enderecos',
  });
  return Endereco;
};