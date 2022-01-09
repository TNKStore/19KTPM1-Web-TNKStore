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
        const isActivated = await userService.checkActivate(user);
        const isLocked = await userService.checkLock(user);
        const isValid = await userService.verifyPassword(password, user);
        if (!isValid || !isActivated || isLocked) {
            return done(null, false);
        }
        return done(null, user)
    }
));

passport.serializeUser(function (user, done) {
    done(null, {
        email: user.email,
        id: user.id
    });
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport