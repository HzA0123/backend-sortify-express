const express = require('express');
const router = express.Router();
const statistikController = require('../controllers/statistikController');

router.get('/user', statistikController.getUserStat);
router.get('/global', statistikController.getGlobalStat);

module.exports = router;
