const mongoose = require('mongoose');

const Gender = mongoose.model('Genders',
    {
        id: { type: String },
        name: { type: String }
    },
    { _id: false }
);

module.exports = Gender;