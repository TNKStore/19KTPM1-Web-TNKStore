const express = require('express');
const controller = require("./userController")
const router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect('/login')
});

router.get('/login', controller.login);

router.get('/signup', controller.signup);

router.get('/my-account', controller.getAccount);

router.get('/wishlist', controller.getWishlist);

module.exports = router