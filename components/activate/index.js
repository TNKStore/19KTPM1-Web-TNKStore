const express = require('express');
const router = express.Router();
const controller = require('./activateController')

router.get('/', controller.activate);

module.exports = router