const mongoose = require('mongoose');

const PostPlayer = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Runs: Number,
    Wickets: Number,
    Catches: Number,
    Hs: Number
});

module.exports = mongoose.model('insertPlayer', PostPlayer);
