const express = require("express");
const router = express.Router();

// Import do controller
const { AnimalController } = require("../controllers/AnimalController");

// Rotas
router.post("/register", AnimalController.registerAnimal);
router.post("/delete", AnimalController.delete);
router.post("/findAnimalsNoCollars", AnimalController.findAnimalsNoCollars);
router.post("/updateInfo", AnimalController.updateInfo);
router.post("/searchCollarByName", AnimalController.searchCollarByName);
router.post("/findAnimals", AnimalController.findAnimals);
router.post("/getAnimalById", AnimalController.getAnimalById);

module.exports = router;
