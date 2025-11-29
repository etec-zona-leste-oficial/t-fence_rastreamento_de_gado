const express = require("express");
const router = express.Router();

// Import do controller
const { FenceController } = require("../controllers/FenceController");

// Rotas
router.post("/register", FenceController.registerFence);
router.post("/select", FenceController.findFences);
router.post("/updateFence", FenceController.updateFence);
router.post("/deleteFence", FenceController.deleteFence);
router.post("/findFenceById", FenceController.findFenceById);
router.post("/search", FenceController.searchFenceByName);

module.exports = router;
