const { Schema, model } = require("mongoose");

const couponSchema = new Schema({
    couponName: String,
    discountAmount: Number,
    minPurchase: Number,
})

module.exports.Coupon = new model("Coupon", couponSchema);