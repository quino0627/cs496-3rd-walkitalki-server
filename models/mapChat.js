var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mapChatSchema = new Schema({
    username : String,
    userID : Number,
    content : String,
    timestamp :{ type: Date, default: Date.now  },
    latitude : Number,
    longitude : Number,
    chat_id : String    
});

module.exports = mongoose.model('mapchat', mapChatSchema);