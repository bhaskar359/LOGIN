const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.find);
router.post('/',userController.find);

module.exports = router;