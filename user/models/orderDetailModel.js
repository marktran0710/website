const mongoose = require('mongoose');

const OrderDetail = mongoose.model('OrderDetails',
    {
        product: String,
        quantity: Number,
        total: Number,
        order_id: String
    }
);

module.exports = OrderDetail;