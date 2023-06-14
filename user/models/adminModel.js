const mongoose = require('mongoose');

const Admin = mongoose.model('Admins',
    {
        adminId: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String,
            minLength: 6
        }
    }
);

module.exports = Admin;