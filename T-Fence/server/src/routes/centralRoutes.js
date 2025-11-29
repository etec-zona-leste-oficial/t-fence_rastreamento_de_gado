const express = require("express");
const router = express.Router();

// Import do controller
const { CentralController } = require("../controllers/CentralController");

// Rotas
router.post("/register", CentralController.register);
router.post("/verifyCentralPair", CentralController.verifyCentralPair);

module.exports = router;
