const express = require("express");
const router = express.Router();
const cartDetailApiController = require('./cartDetailApiController')

router.get('/', cartDetailApiController.get)
router.post('/add', cartDetailApiController.add)

module.exports = router