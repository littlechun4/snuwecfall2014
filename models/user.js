var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user_id: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);
