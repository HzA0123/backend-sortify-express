const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../utils/gcsUploader");

// Semua route memerlukan authentication
router.use(authenticateToken);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/export", userController.exportData);

module.exports = router;
