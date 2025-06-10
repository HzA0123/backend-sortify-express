const jwt = require('jsonwebtoken');

// Simulasi database user sederhana (array di memory)
const users = [
  {
    id: 1,
    email: 'user@sortify.com',
    password: 'password123',
    name: 'Sortify User',
    phone: '08123456789',
    city: 'Jakarta'
  }
];
let nextId = 2;

// Export users array untuk digunakan oleh userController
exports.users = users;

// Helper untuk memvalidasi email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper untuk memfilter data user yang aman untuk dikirim ke client
const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, phone, city } = req.body;

    // Validasi input
    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, password, dan nama wajib diisi' 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Format email tidak valid' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password minimal 6 karakter' 
      });
    }

    // Cek email sudah terdaftar
    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email sudah terdaftar' 
      });
    }

    // Buat user baru
    const newUser = { 
      id: nextId++, 
      email, 
      password, 
      name,
      phone: phone || '',
      city: city || '',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);

    // Kirim response sukses
    res.json({ 
      success: true, 
      message: 'Registrasi berhasil', 
      user: sanitizeUser(newUser) 
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan saat registrasi' 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email dan password wajib diisi' 
      });
    }

    // Cari user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email atau password salah' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      'SECRET_KEY', 
      { expiresIn: '1d' }
    );

    // Kirim response sukses
    res.json({ 
      success: true, 
      message: 'Login berhasil',
      token, 
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan saat login' 
    });
  }
};
