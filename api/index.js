const express = require("express");
const router = express.Router();
const cartApiRouter = require('./cart');

router.use('/cart', cartApiRouter)

module.exports = router