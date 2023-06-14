const mongoose = require('mongoose');

const User = mongoose.model('Customer_demo',
    {
        userId: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String,
            minLength: 6
        },
        fullname: {
            type: String
        },
        gender: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        phone: {
            type: String,
            minLength: 9,
            maxLength: 11
        },
        nation: {
            type: String
        },
        city: {
            type: String
        },
        address: {
            type: String,
        },
        delivery_address: {
            type: String
        },
        avatar: {
            type: String
        },
        birth: {
            type: Date
        },
        date: {
            type: Date, default: Date.now
        }
    }
);

module.exports = User;