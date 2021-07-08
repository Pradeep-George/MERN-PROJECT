const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, ' Enter the Name']
        },
        phone: {
            type: String,
            required: [true, ' Enter the Phone number'],
            unique:[true, ' This Phone number has already taken'],
            minlength:5,
            maxlength:12
        },
        password: {
            type: String,
            required: [true, ' Enter the Password']
        },
        city: {
            type: String,
            required: [true, ' Enter the City']
        },
        date: {
            type: Date,
            default: Date.now
        }

    }
);

module.exports = User = mongoose.model("users", UserSchema);