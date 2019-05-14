const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    dateToPost: String,
    posted: Boolean,
    time: { type: Date, default: Date.now },
    post: String
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
        required: false
    },
    tokenSecret: {
        type: String,
        required: false
    },
    posts: [postSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;