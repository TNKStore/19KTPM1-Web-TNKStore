const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs')
const session = require("express-session")
const passport = require("./passport")
const loggedInGuard = require('./middlewares/loggedInGuard')
const userIDMiddleware = require('./middlewares/userIDMiddleware')
const indexRouter = require('./components/others');
const authRouter = require('./components/auth');
const cartRouter = require('./components/cart');
const checkoutRouter = require('./components/checkout');
const productRouter = require('./components/product');
const userRouter = require('./components/user');
const catalogRouter = require('./components/catalog');
const apiRouter = require('./api')
const fs = require("fs");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'process.env.SECRET_SESSION'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(userIDMiddleware);

app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/cart', cartRouter);
app.use('/checkout', loggedInGuard, checkoutRouter);
app.use('/products', productRouter);
app.use('/catalog', catalogRouter);
app.use('/customer', loggedInGuard, userRouter);
app.use('/api', apiRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

// Register partials
hbs.registerPartials(__dirname + '/views/product/partials');
hbs.registerPartials(__dirname + '/views/partials');