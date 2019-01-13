var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mapChatSchema = new Schema({
    username = String,
    userID = Number,
    content = String,
    timestamp = Date,
    latitude = Number,
    longitude = Number
});

module.exports = mongoose.model('mapchat', mapChatSchema);