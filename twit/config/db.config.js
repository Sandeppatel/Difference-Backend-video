const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dammytwiter').then(() => {
    console.log(" cunnect database ");
});

const user = mongoose.connection;

module.exports = user;
