const { Schema, model } = require('mongoose');
const { cartItemSchema } = require('./cartItem');


module.exports.Order = model('Order', Schema({
    cartItems: [cartItemSchema],
    transaction_id: {
        type: String,
        unique: true,
    },
    address: {
        phone: Number,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: Number,
        country: String
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Complete"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total_amount: Number,
    sessionKey: String,
}))