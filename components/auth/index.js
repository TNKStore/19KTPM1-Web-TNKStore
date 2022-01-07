const express = require('express');
const router = express.Router();
const controller = require('./authController')
const passport = require("../../passport");

router.get('/login', controller.getLogIn);

router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login?wrong-password'
        }),
    controller.postLogIn);


router.get('/signup', controller.getSignUp);

router.post('/signup', controller.postSignUp);

router.get('/logout', controller.logout);

module.exports = router