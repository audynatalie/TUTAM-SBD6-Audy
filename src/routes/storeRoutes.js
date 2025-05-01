const storeController = require('../controllers/storeControllers');
const express = require('express');
const router = express.Router();

router.get("/getAll", storeController.getAllStores);

router.post("/create", storeController.createStore);

router.get("/:id", storeController.getID);

router.put("/", storeController.updateStore);

router.delete("/:id", storeController.deleteStore);

module.exports = router