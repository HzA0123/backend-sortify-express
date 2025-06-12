// 📦 seeders/20250611230000-seed-edukasis.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "edukasis",
      [
        {
          title: "Cara Memilah Sampah Organik dan Anorganik",
          content:
            "Pelajari cara mudah memilah sampah organik dan anorganik di rumah...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Daur Ulang Plastik untuk Lingkungan",
          content:
            "Plastik bisa didaur ulang menjadi barang bermanfaat, berikut caranya...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Tips Mengurangi Sampah Elektronik",
          content:
            "Jangan buang sampah elektronik sembarangan, simak tips berikut...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("edukasis", null, {});
  },
};
