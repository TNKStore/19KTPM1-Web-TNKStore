const express = require('express');
const router = express.Router();
const controller = require('./authController')
const passport = require("../../passport");

router.get('/login', controller.login);

router.post('/login',
    passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login?wrong-password'
        }
    )
);

router.get('/signup', controller.getSignUp);

router.post('/signup', controller.postSignUp);

router.get('/logout', controller.logout);

module.exports = router