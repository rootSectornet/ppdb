'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tryoutDetailsoalsses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tryout_detail: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tryoutDetails',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_soal: {
        type: Sequelize.INTEGER,
        references: {
          model: 'soals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      jawaban_user: {
        type: Sequelize.STRING(5000)
      },
      jawaban_benar: {
        type: Sequelize.STRING(5000)
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tryoutDetailsoalsses');
  }
};