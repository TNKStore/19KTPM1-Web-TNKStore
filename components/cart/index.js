const express = require('express');
const router = express.Router();
const controller = require('./cartDetailController')

router.get('/', controller.getCart)

module.exports = router