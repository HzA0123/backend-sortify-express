const express = require('express');
const cors = require('cors');
const path = require('path');
const sampahRoutes = require('./src/routers/sampahRoutes');
const authRoutes = require('./src/routers/authRoutes');
const userRoutes = require('./src/routers/userRoutes');
const statistikRoutes = require('./src/routers/statistikRoutes');
const edukasiRoutes = require('./src/routers/edukasiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // izinkan akses dari frontend Vite
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Untuk akses file upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routing utama

app.use('/api/sampah', sampahRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/statistik', statistikRoutes);
app.use('/api/edukasi', edukasiRoutes);

app.get('/', (req, res) => {
  res.send('Backend Sortify Express API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
