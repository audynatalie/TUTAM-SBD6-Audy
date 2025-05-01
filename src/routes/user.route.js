const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post("/register", userController.createUser);

router.post("/topUp", userController.userTopUp);

router.post("/login", userController.login);

router.get("/", userController.getAllUsers);

router.get("/:email", userController.getUserByEmail);

router.put("/", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;