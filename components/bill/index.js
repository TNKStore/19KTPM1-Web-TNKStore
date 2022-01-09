const express = require('express');
const router = express.Router();
const controller = require("./billController");

router.get('/', controller.getOrder);

module.exports = router