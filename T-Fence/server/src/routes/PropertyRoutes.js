const express = require("express");
const router = express.Router();

// Import do controller
const { PropertyController } = require("../controllers/PropertyController");

// Rotas
router.post("/register", PropertyController.registerProperty);
router.post("/select", PropertyController.findProperty);
router.post("/requestCollaborators", PropertyController.requestCollaborators);
router.post("/approveCollaborator", PropertyController.approveCollaborator);
router.post("/findUserByPropertyId", PropertyController.findUserByPropertyId);
router.post("/findCollaborator", PropertyController.findCollaborator);
router.post("/removeRequestCollaborator", PropertyController.removeRequestCollaborator);
router.post("/updateName", PropertyController.updateName);
router.post("/updateArea", PropertyController.updateArea);
router.post("/findPropertyById", PropertyController.findPropertyById);
router.post("/updateDescription", PropertyController.updateDescription);


router.post("/fetchCollaborates", PropertyController.fetchCollaborates);
router.post("/removeCollaborator", PropertyController.removeCollaborator);
router.post("/fetchRequestCollaborators", PropertyController.fetchRequestCollaborators);

module.exports = router;
