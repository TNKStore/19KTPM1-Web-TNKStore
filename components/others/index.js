const express = require('express');
const router = express.Router();
const controller = require('./otherController')

router.get('/', controller.getHome)

router.get('/home', controller.getHome)

router.get('/contact', controller.getContact)

module.exports = router