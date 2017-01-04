var faker = require('faker');

var db = require('./db/mongoose');
var config = require('./config');

var User = require('./models/UserModel');
var Client = require('./auth/Client');
var AccessToken = require('./auth/AccessToken');
var RefreshToken = require('./auth/RefreshToken');

User.remove({}, function(err) {
    var user = new User({
        username: config.get("generateDataToTest:user:username"),
        password: config.get("generateDataToTest:user:password")
    });

    user.save(function(err, user) {
        return !err ? true : false;
    });
});

Client.remove({}, function(err) {
    var client = new Client({
        name: config.get("generateDataToTest:client:name"),
        clientId: config.get("generateDataToTest:client:clientId"),
        clientSecret: config.get("generateDataToTest:client:clientSecret")
    });

    client.save(function(err, client) {
        return !err ? true : false;
    });
});

AccessToken.remove({}, function(err) {
    return !err ? true : false;
});

RefreshToken.remove({}, function(err) {
    return !err ? true : false;
});

setTimeout(function() {
    db.disconnect();
}, 3000);