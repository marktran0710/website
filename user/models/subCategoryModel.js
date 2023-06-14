const mongoose = require('mongoose');

const SubCategory = mongoose.model('SubCategories',
    {
        name: { type: String }
    }
);

module.exports = SubCategory;