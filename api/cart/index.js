const express = require("express");
const router = express.Router();
const cartDetailApiController = require('./cartDetailApiController')

router.get('/', cartDetailApiController.get)
router.post('/add', cartDetailApiController.add)
router.post('/update', cartDetailApiController.update)
router.post('/delete', cartDetailApiController.delete)

module.exports = router