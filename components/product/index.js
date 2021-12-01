const express = require('express');
const controller = require("./productController")
const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getDetail);

module.exports = router