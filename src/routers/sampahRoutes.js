const express = require('express');
const router = express.Router();
const sampahController = require('../controllers/sampahController');

// Untuk upload file, biasanya pakai multer
const upload = require('../utils/uploadHelper');

// Endpoint upload & deteksi sampah
router.post('/detect', upload.single('image'), sampahController.uploadAndDetect);

// Endpoint untuk total klasifikasi
router.get('/total', sampahController.getTotalKlasifikasi);
// Endpoint untuk total sampah daur ulang
router.get('/daur-ulang', sampahController.getTotalDaurUlang);

module.exports = router;
