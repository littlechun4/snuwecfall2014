var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    login_count: Number
});

module.exports = mongoose.model('User', userSchema);
