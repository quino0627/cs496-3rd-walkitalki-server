var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  userID: Number,
  profilepic: String
});

module.exports = mongoose.model("user", userSchema);
