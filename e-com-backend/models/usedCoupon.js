const { Schema, model } = require('mongoose');

const usedCouponSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: Number,
})

module.exports.Usedcoupon = new model("Usedcoupon", usedCouponSchema);