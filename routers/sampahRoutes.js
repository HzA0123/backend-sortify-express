const express = require("express");
const router = express.Router();
const sampahController = require("../controllers/sampahController");
const upload = require("../utils/uploadMemory"); // ✅ ini yang benar

// Endpoint upload & deteksi sampah
router.post(
  "/detect",
  upload.single("image"),
  sampahController.uploadAndDetect
);

// Endpoint untuk total klasifikasi
router.get("/total", sampahController.getTotalKlasifikasi);
router.get("/daur-ulang", sampahController.getTotalDaurUlang);

module.exports = router;
