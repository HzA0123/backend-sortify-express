// 📦 models/edukasi.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Edukasi extends Model {}

  Edukasi.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Edukasi",
      tableName: "edukasis",
    }
  );

  return Edukasi;
};
