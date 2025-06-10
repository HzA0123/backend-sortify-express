const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// URL Flask API 
const FLASK_API_URL = 'http://localhost:5000/predict';

// Array untuk menyimpan riwayat klasifikasi (in-memory)
const klasifikasiHistory = [];

const uploadAndDetect = async (req, res) => {
    try {
        // 1. Validasi file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Silakan upload file gambar'
            });
        }

        console.log('File diterima:', req.file.filename);

        // 2. Siapkan FormData untuk Flask API
        const formData = new FormData();
        const imageStream = fs.createReadStream(req.file.path);
        formData.append('image', imageStream, req.file.filename);

        console.log('Mengirim gambar ke Flask API...');

        // 3. Kirim ke Flask API
        const response = await axios.post(FLASK_API_URL, formData, {
            headers: {
                ...formData.getHeaders(),
                'Accept': 'application/json'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        console.log('Response dari Flask API:', response.data);

        // 4. Hapus file setelah diproses
        fs.unlinkSync(req.file.path);

        // 5. Simpan ke riwayat klasifikasi
        klasifikasiHistory.push({
            waktu: new Date().toISOString(),
            hasil: response.data
        });

        // 6. Kirim hasil prediksi ke client
        const result = {
            success: true,
            message: 'Gambar berhasil diproses',
            data: response.data // Mengambil seluruh response data dari Flask
        };

        console.log('Mengirim hasil ke client:', result);
        return res.status(200).json(result);

    } catch (error) {        // Hapus file jika masih ada
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.error('Error pada uploadAndDetect:', error);

        // Handle berbagai jenis error
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                success: false,
                message: 'Layanan AI tidak tersedia. Pastikan server Flask sedang berjalan.'
            });
        }

        if (error.response) {
            // Error dari Flask API
            return res.status(error.response.status).json({
                success: false,
                message: 'Error dari layanan AI: ' + (error.response.data.message || 'Terjadi kesalahan yang tidak diketahui')
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan internal saat memproses gambar'
        });
    }
};

// Endpoint untuk mendapatkan total klasifikasi
const getTotalKlasifikasi = (req, res) => {
    res.json({
        success: true,
        total: klasifikasiHistory.length
    });
};

// Endpoint untuk mendapatkan total sampah yang didaur ulang
const getTotalDaurUlang = (req, res) => {
    // Hitung entri yang hasil deteksinya bukan "Trash"
    let total = 0;
    klasifikasiHistory.forEach(item => {
        // Cek deteksi utama (array atau objek)
        let detections = [];
        if (item.hasil && Array.isArray(item.hasil.detections)) {
            detections = item.hasil.detections;
        } else if (item.hasil && item.hasil.detections) {
            detections = [item.hasil.detections];
        } else if (item.hasil) {
            detections = [item.hasil];
        }
        // Hitung jika ada deteksi yang bukan Trash
        if (detections.some(d => {
            const kategori = (d.jenis_sampah || d.jenis || d.class || d.label || '').toLowerCase();
            return kategori && kategori !== 'trash';
        })) {
            total += 1;
        }
    });
    res.json({
        success: true,
        total
    });
};

module.exports = {
    uploadAndDetect,
    getTotalKlasifikasi,
    getTotalDaurUlang
};
