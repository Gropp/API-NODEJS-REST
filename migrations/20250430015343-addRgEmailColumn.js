'use strict';

const { QueryInterface } = require("sequelize");
const { Sequelize } = require("../models");

// const { QueryInterface } = require('sequelize');

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     queryInterface.addColumn('pessoas','rg',{
//       type: Sequelize.STRING,
//       allowNull: falsse,
//       defaultValue: '00000000'
//     })
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     QueryInterface.removeColunm('pessoas','rg')
//   }
// };

// É muito importante controlar o COMMIT para que nao tenhamos comandos executados pela metade, entao vamos substituir o codigo acima com o codigo de controle de transactions

module.exports = {
  up: async(queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('pessoas', 'rg',{
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      await queryInterface.addColumn('pessoas', 'email',{
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
  },
  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('pessoas', 'rg', (transaction));
      await transaction.commit();

      await queryInterface.removeColumn('pessoas', 'email', (transaction));
      await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
  }
};