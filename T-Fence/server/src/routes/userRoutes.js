const express = require("express");
const router = express.Router();

// Import do controller
const { UserController } = require("../controllers/userController");

// Rotas
router.post("/registerNotificationToken", UserController.registerNotificationToken);
router.post("/sendPushNotification", UserController.triggerNotification);
router.post("/verifyEmailExist", UserController.verifyEmailExist);
router.post("/updatePassword", UserController.updatePassword);
router.post("/updateNumber", UserController.updateNumber);
router.post("/updateName", UserController.updateName);
router.post("/selectUser", UserController.selectUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verifyUserType", UserController.verifyUserType);



module.exports = router;
