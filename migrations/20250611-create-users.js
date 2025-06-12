"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      settings: {
        type: Sequelize.JSON,
      },
      totalScans: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      accuracy: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      lastActive: {
        type: Sequelize.DATE,
      },
      photoUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
