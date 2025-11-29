const express = require("express");
const router = express.Router();

// Import do controller
const { AlertController } = require("../controllers/AlertController");

// Rotas
router.post("/findAlerts", AlertController.findAlerts);

module.exports = router;
