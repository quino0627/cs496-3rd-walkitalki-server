var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mapPostSchema = new Schema({
  title: String,
  username: String,
  userID: Number,
  content: String,
  timestamp: { type: Date, default: Date.now, expires: 86400 },
  latitude: Number,
  longitude: Number,
  post_id: String,
  pictureUrl: String
});

module.exports = mongoose.model("mappost", mapPostSchema);
