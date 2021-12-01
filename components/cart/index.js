const express = require('express');
const router = express.Router();
const controller = require('./cartController')

router.get('/', controller.getCart)
router.get('/checkout', controller.checkOut)

module.exports = router