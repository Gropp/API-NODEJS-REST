'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relação 1 - 1 com o model Endereço
      // sempre a tabela que é referenciada por uma chave estrangeira - é dona has - tem
      // uma pessoa tem um endereço
        Pessoa.hasOne(models.Endereco, {foreignKey: 'pessoaId'})
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    rg: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
  });
  return Pessoa;
};