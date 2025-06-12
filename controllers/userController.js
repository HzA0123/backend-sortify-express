// controllers/userController.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const getUserFromToken = async (req) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token tidak ditemukan");

    const decoded = jwt.verify(token, "SECRET_KEY");
    const user = await User.findByPk(decoded.id);
    if (!user) throw new Error("User tidak ditemukan");

    return user;
  } catch (error) {
    throw new Error("Token tidak valid");
  }
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

// OPTIONAL: upload foto jika kamu aktifkan fitur upload
// exports.updatePhoto = async (req, res) => {
//   try {
//     const user = await getUserFromToken(req);
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'File foto tidak ditemukan' });
//     }
//     user.photoUrl = `/uploads/${req.file.filename}`;
//     await user.save();
//     res.json({ success: true, message: 'Foto profil berhasil diupdate', photoUrl: user.photoUrl });
//   } catch (error) {
//     res.status(401).json({ success: false, message: error.message });
//   }
// };
