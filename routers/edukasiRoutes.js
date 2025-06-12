const express = require('express');
const router = express.Router();
const edukasiController = require('../controllers/edukasiController');

router.get('/', edukasiController.getAllEdukasi);
router.get('/:id', edukasiController.getEdukasiById);

module.exports = router;
