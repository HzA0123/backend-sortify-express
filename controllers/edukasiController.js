// 📦 controllers/edukasiController.js
const { Edukasi } = require("../models");

// Ambil semua artikel edukasi dari database
exports.getAllEdukasi = async (req, res) => {
  try {
    const edukasi = await Edukasi.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ success: true, edukasi });
  } catch (error) {
    console.error("Error getAllEdukasi:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil data edukasi" });
  }
};

// Ambil satu artikel berdasarkan ID
exports.getEdukasiById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const artikel = await Edukasi.findByPk(id);

    if (artikel) {
      res.json({ success: true, artikel });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Artikel tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error getEdukasiById:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Terjadi kesalahan saat mengambil data",
      });
  }
};
