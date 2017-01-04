var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');

require('./auth/Auth');
var config = require('./config');

var apiRoutes = require('./routes/ApiRoutes');
var userRoutes = require('./routes/UserRoutes');
var oauth2 = require('./auth/OAuth2').token;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(passport.initialize());

app.use('/', apiRoutes);
app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);

app.use('/api/auth', oauth2);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.json({ error: 'Não encontrado!' });
    return;
});

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message });
    return;
});

module.exports = app;