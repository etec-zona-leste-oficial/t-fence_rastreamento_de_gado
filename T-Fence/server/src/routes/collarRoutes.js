const express = require("express");
const router = express.Router();

// Import do controller
const { CollarController } = require("../controllers/CollarController");

// Rotas
router.post("/register", CollarController.register);
router.post("/delete", CollarController.delete);
router.post("/activeCollar", CollarController.activeCollar);
router.post("/findCollar", CollarController.findCollar);
router.post("/select", CollarController.getAll);
router.post("/findCollarById", CollarController.findCollarById);
router.post("/updateInfo", CollarController.updateInfo);
router.post("/searchCollarByName", CollarController.searchCollarByName);
router.post("/updateLocation", CollarController.updateLocation);

module.exports = router;
