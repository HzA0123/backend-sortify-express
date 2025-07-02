const express = require("express");
const cors = require("cors");
const path = require("path");
const sampahRoutes = require("./routers/sampahRoutes");
const authRoutes = require("./routers/authRoutes");
const userRoutes = require("./routers/userRoutes");
const edukasiRoutes = require("./routers/edukasiRoutes");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sortify-project.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Untuk akses file upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routing utama

app.use("/api/sampah", sampahRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/edukasi", edukasiRoutes);

app.get("/", (req, res) => {
  res.send("Backend Sortify Express API is running!");
});

// Jalankan migration otomatis saat start (hanya jika belum ada terminal Railway)
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized (sequelize.sync)");
  })
  .catch((err) => {
    console.error("Gagal sync database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
