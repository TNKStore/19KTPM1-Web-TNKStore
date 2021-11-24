const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs')

const indexRouter = require('./routes/main');
const usersRouter = require('./routes/users');
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
hbs.registerPartials(__dirname + '/views/partials')

// Register Helper
hbs.registerHelper("list", function (context, options) {
    const attrs = Object.keys(options.hash)
        .map(function (key) {
            return key + '="' + options.hash[key] + '"';
        })
        .join(" ");
    let ret = ""

    return (
        context.map(function (item) {
            return "<li " + attrs + ">" + options.fn(item) + "</li>"
        }).join("\n")
    );
});
