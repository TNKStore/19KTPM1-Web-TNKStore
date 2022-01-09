const express = require("express");
const router = express.Router();
const cartApiRouter = require('./cart');
const billApiRouter = require('./bill');

router.use('/cart', cartApiRouter)
router.use('/bill', billApiRouter)

module.exports = router