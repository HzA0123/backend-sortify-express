// Controller untuk artikel edukasi

// Dummy data artikel edukasi
const edukasiList = [
  {
    id: 1,
    title: 'Cara Memilah Sampah Organik dan Anorganik',
    content: 'Pelajari cara mudah memilah sampah organik dan anorganik di rumah...'
  },
  {
    id: 2,
    title: 'Daur Ulang Plastik untuk Lingkungan',
    content: 'Plastik bisa didaur ulang menjadi barang bermanfaat, berikut caranya...'
  },
  {
    id: 3,
    title: 'Tips Mengurangi Sampah Elektronik',
    content: 'Jangan buang sampah elektronik sembarangan, simak tips berikut...'
  }
];

exports.getAllEdukasi = async (req, res) => {
  res.json({ success: true, edukasi: edukasiList });
};

exports.getEdukasiById = async (req, res) => {
  const id = parseInt(req.params.id);
  const artikel = edukasiList.find(e => e.id === id);
  if (artikel) {
    res.json({ success: true, artikel });
  } else {
    res.status(404).json({ success: false, message: 'Artikel tidak ditemukan' });
  }
};
