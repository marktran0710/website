const mongoose = require('mongoose');

const Cart = mongoose.model('Carts',
    {
        cartId: { type: String, required: true },
        userId: { type: String },
        status: { type: String, default: 'active' },
        modifiedOn: { type: Date, default: Date.now() },
        products: Object
    }
);

module.exports = Cart;