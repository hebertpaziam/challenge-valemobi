var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');

var config = require('../config');
var db = require('../db/mongoose');

var User = require('../models/UserModel');
var AccessToken = require('./AccessToken');
var RefreshToken = require('./RefreshToken');

// cria o servidor OAuth 2.0
var aserver = oauth2orize.createServer();

// handler de erro genérico
var errFn = function(cb, err) { if (err) return cb(err); };

// Destroi tokens antigos e gera um novo acesso e faz um refresh do token
var generateTokens = function(data, done) {

    var errorHandler = errFn.bind(undefined, done),
        refreshToken,
        refreshTokenValue,
        token,
        tokenValue;

    RefreshToken.remove(data, errorHandler);
    AccessToken.remove(data, errorHandler);

    tokenValue = crypto.randomBytes(128).toString('hex');
    refreshTokenValue = crypto.randomBytes(128).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);

    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);

    token.save(function(err) {
        if (err) return done(err);

        done(null, tokenValue, refreshTokenValue, {
            'expires_in': config.get('security:tokenLife')
        });
    });
};

// Exchange username & password for access token.
aserver.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) return done(err);
        if (!user || !user.checkPassword(password)) return done(null, false);
        var model = {
            userId: user.userId,
            clientId: client.clientId
        };
        generateTokens(model, done);
    });
}));

// Exchange refreshToken for access token.
aserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function(err, token) {
        if (err) return done(err);
        if (!token) return done(null, false);

        User.findById(token.userId, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);

            var model = {
                userId: user.userId,
                clientId: client.clientId
            };
            generateTokens(model, done);
        });
    });
}));


exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    aserver.token(),
    aserver.errorHandler()
];