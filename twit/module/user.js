const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('user', userShema);
