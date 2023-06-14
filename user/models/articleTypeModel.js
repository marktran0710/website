const mongoose = require('mongoose');

const ArticleType = mongoose.model('ArticleTypes',
    {
        id: { type: String },
        name: { type: String }
    }

);

module.exports = ArticleType;