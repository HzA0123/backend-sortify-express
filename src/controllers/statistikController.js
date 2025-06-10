// Controller untuk statistik user dan global

// Dummy data statistik
const dummyUserStat = {
  totalDeteksi: 25,
  totalPoin: 12470,
  level: 5,
  perKategori: {
    organik: 10,
    plastik: 8,
    kaca: 3,
    elektronik: 2,
    lain: 2
  }
};

const dummyGlobalStat = {
  totalUser: 1000,
  totalDeteksi: 5000,
  leaderboard: [
    { name: 'Andi', poin: 20000 },
    { name: 'Budi', poin: 18000 },
    { name: 'Citra', poin: 15000 }
  ]
};

exports.getUserStat = async (req, res) => {
  res.json({ success: true, statistik: dummyUserStat });
};

exports.getGlobalStat = async (req, res) => {
  res.json({ success: true, statistik: dummyGlobalStat });
};
