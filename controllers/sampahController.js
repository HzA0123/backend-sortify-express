// 📦 controllers/sampahController.js
const axios = require("axios");
const FormData = require("form-data");
const { Sampah } = require("../models");
const uploadToGCS = require("../utils/gcsUploader");

const FLASK_API_URL = "https://notnith-deteksi-sampah-sprtofy.hf.space/predict";

const uploadAndDetect = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Silakan upload file gambar",
      });
    }

    // Upload ke Google Cloud Storage
    const { publicUrl, filename } = await uploadToGCS(req.file);

    // Ambil gambar dari GCS untuk dikirim ke Flask sebagai stream
    const imageResponse = await axios.get(publicUrl, {
      responseType: "stream",
    });

    const formData = new FormData();
    formData.append("image", imageResponse.data, filename);

    // Kirim ke Flask API
    const response = await axios.post(FLASK_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Accept: "application/json",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    // Simpan ke database
    await Sampah.create({
      filename,
      hasilDeteksi: response.data,
      waktuKlasifikasi: new Date(),
      imageUrl: publicUrl,
    });

    res.status(200).json({
      success: true,
      message: "Gambar berhasil diproses",
      data: response.data,
      imageUrl: publicUrl,
    });
  } catch (error) {
    console.error("Error pada uploadAndDetect:", error);

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        success: false,
        message:
          "Layanan AI tidak tersedia. Pastikan server Flask sedang berjalan.",
      });
    }

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message:
          "Error dari layanan AI: " +
          (error.response.data.message ||
            "Terjadi kesalahan yang tidak diketahui"),
      });
    }

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal saat memproses gambar",
    });
  }
};

const getTotalKlasifikasi = async (req, res) => {
  try {
    const total = await Sampah.count();
    res.json({ success: true, total });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil total klasifikasi" });
  }
};

const getTotalDaurUlang = async (req, res) => {
  try {
    const sampahs = await Sampah.findAll();
    let total = 0;

    sampahs.forEach((item) => {
      let detections = [];
      if (item.hasilDeteksi && Array.isArray(item.hasilDeteksi.detections)) {
        detections = item.hasilDeteksi.detections;
      } else if (item.hasilDeteksi && item.hasilDeteksi.detections) {
        detections = [item.hasilDeteksi.detections];
      } else if (item.hasilDeteksi) {
        detections = [item.hasilDeteksi];
      }

      if (
        detections.some((d) => {
          const kategori = (
            d.jenis_sampah ||
            d.jenis ||
            d.class ||
            d.label ||
            ""
          ).toLowerCase();
          return kategori && kategori !== "trash";
        })
      ) {
        total++;
      }
    });

    res.json({ success: true, total });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Gagal menghitung daur ulang" });
  }
};

module.exports = {
  uploadAndDetect,
  getTotalKlasifikasi,
  getTotalDaurUlang,
};
