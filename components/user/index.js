const express = require('express');
const controller = require("./userController")
const router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect('/')
});

router.get('/my-account', controller.getAccount);

router.post('/my-account/account-detail', controller.changeAccountDetail);
router.post('/my-account/change-password', controller.changePassword);

router.get('/wishlist', controller.getWishlist);

module.exports = router