var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user_id: String,
    password: String,
    login_count: Number
});

module.exports = mongoose.model('User', userSchema);
