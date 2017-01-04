var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

module.exports = mongoose;