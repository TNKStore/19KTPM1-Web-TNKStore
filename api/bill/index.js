const express = require("express");
const router = express.Router();
const billApiController = require('./billApiController')

router.post('/create', billApiController.create)

module.exports = router