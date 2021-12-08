const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const userService = require("../components/user/userService");

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (username, password, done) {
        const user = await userService.findByEmail(username);
        if (!user) {
            return done(null, false);
        }
        const isValid = await userService.verifyPassword(password, user);
        if (!isValid) {
            return done(null, false);
        }
        return done(null, user)
    }
));

passport.serializeUser(function (user, done) {
    done(null, {
        email: user.email
    });
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport