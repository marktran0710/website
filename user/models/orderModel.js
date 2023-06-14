const mongoose = require('mongoose');

const Order = mongoose.model('Order',
    {
        orderId: { type: String, required: true },
        userId: String,
        cartId: String,
        address: String,
        phone: Number,
        shipping: String,
        payment: String,
        products: Object,
        total: String,
        date: {
            type: Date, default: Date.now
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = Order;