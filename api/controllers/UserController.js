var User = require('../models/UserModel');
var db = require('../db/mongoose');

exports.getById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.getList = function(req, res) {
    User.find(function(err, users) {
        if (err) res.send(err);
        res.json(users);
    });
}

exports.insert = function(req, res) {
    req.checkBody('username', 'Usuário inválido').notEmpty().len(3, 40)
    req.checkBody('password', 'Senha inválida').notEmpty().len(6, 50)

    res.setHeader('Content-Type', 'application/json')
    var errors = req.validationErrors();
    if (errors) {
        res.send(errors, 400)
    } else {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;

        User.findOne({ username: username }, function(err, user) {
            if (user) {
                res.send("Usuário ja está cadastrado", 422)
            } else {
                user.save(function(err) {
                    if (err) res.send(err);
                    res.json({ message: 'Usuário cadastrado com sucesso!' });
                });
            }
        });
    }
}
exports.update = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) res.send(err);
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Usuário atualizado com sucesso!' });
        });
    });
}

exports.delete = function(req, res) {
    User.remove({ _id: req.params.id }, function(err, user) {
        if (err) res.send(err);
        res.json({ message: 'Usuário removido com sucesso!' });
    });
}