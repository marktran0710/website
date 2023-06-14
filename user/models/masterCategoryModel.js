const mongoose = require('mongoose');

const MasterCategory = mongoose.model('MasterCategories',
    {
        name: { type: String },
        image: { type: String }
    }
);

module.exports = MasterCategory;