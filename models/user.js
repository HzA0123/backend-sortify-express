"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      settings: {
        type: DataTypes.JSON,
      },
      totalScans: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      accuracy: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      lastActive: {
        type: DataTypes.DATE,
      },
      photoUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
