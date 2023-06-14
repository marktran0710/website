const mongoose = require('mongoose');

const Product = mongoose.model('product_demos',
    {
        article_id: {
            type: String,
        },
        masterCategory: {
            type: String
        },
        subCategory: {
            type: String
        },
        articleType: {
            type: String
        },
        productDisplayName: {
            type: String
        },
        color: {
            type: String
        },
        image: {
            type: String
        },
        price: {
            type: Number
        },
        detail_desc: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = Product;