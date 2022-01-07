const express = require('express');
const router = express.Router();
const controller = require('./checkoutController')

router.get('/', controller.checkOut)

module.exports = router