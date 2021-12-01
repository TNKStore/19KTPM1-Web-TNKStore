const express = require('express');
const router = express.Router();
const controller = require('./catalogController')

router.get('/', controller.list)
router.get('/:id', controller.list)

module.exports = router