//Save Cart when user cart an item
const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: Number,
    count: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

module.exports.cartItemSchema = cartItemSchema;
module.exports.CartItem = new model('CartItem', cartItemSchema);