// 📦 models/sampah.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sampah extends Model {}

  Sampah.init(
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasilDeteksi: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      waktuKlasifikasi: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // optional, jika kamu ingin relasi ke user nanti
      },
      imageUrl: {
        type: DataTypes.TEXT, // ✅ bisa simpan panjang URL GCS
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Sampah",
      tableName: "sampahs",
    }
  );

  return Sampah;
};
