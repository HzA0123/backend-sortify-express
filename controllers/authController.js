// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, phone, city } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, dan nama wajib diisi",
      });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Format email tidak valid" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password minimal 6 karakter" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone: phone || "",
      city: city || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Registrasi berhasil",
      user: sanitizeUser(newUser.toJSON()),
    });
  } catch (error) {
    console.error("Error in register:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan saat registrasi" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email dan password wajib diisi" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: sanitizeUser(user.toJSON()),
    });
  } catch (error) {
    console.error("Error in login:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan saat login" });
  }
};

const getUserFromToken = async (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Token tidak ditemukan");

  const decoded = jwt.verify(token, "SECRET_KEY");
  const user = await User.findByPk(decoded.id);
  if (!user) throw new Error("User tidak ditemukan");

  return user;
};

exports.getProfile = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const profile = {
      ...user.toJSON(),
      lokasi: user.city || user.lokasi || "",
      level: user.level || 1,
      points: user.points || 0,
      settings: user.settings || {
        tingkatAkurasiMinimum: "95%",
        bahasa: "Bahasa Indonesia",
        autoSaveHasil: false,
        suaraNotifikasi: true,
        notifikasiEmail: true,
        reminderHarian: true,
        updateStatistik: false,
        tipsDaurUlang: true,
        pencapaianBaru: true,
      },
    };
    delete profile.password;
    res.json({ success: true, profile });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const updateData = req.body;

    const allowedFields = ["name", "phone", "city", "lokasi", "settings"];
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    }

    await user.save();
    const profile = {
      ...user.toJSON(),
      lokasi: user.city || user.lokasi || "",
    };
    delete profile.password;
    res.json({ success: true, message: "Profil berhasil diperbarui", profile });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.exportData = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const exportData = {
      profile: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        level: user.level || 1,
        points: user.points || 0,
        joinDate: user.createdAt,
      },
      settings: user.settings || {},
      statistics: {
        totalScans: user.totalScans || 0,
        accuracy: user.accuracy || 0,
        lastActive: user.lastActive || new Date().toISOString(),
      },
    };
    res.json({ success: true, data: exportData });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
