const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: { type: Array, required: true },
    cartKey: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    totalDiscount: { type: Number, default: 0 },
    deliveryTax: { type: Number, default: 250 }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
