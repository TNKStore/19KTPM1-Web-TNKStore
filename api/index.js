const express = require("express");
const router = express.Router();
const cartApiRouter = require('./cart');
const feedbackApiRouter = require('./feedback');
const billApiRouter = require('./bill');

router.use('/cart', cartApiRouter)
router.use('/feedback', feedbackApiRouter)
router.use('/bill', billApiRouter)

module.exports = router