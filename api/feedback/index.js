const express = require("express");
const router = express.Router();
const feedbackApiController = require('./feedbackApiController')

router.post('/add', feedbackApiController.add)

module.exports = router