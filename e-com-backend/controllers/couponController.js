const { Coupon } = require('../models/coupon');
const { Usedcoupon } = require('../models/usedCoupon');

module.exports.createNewCoupon = async (req, res) => {
    const newCoupon = req.body;
    const saveCoupon = new Coupon(newCoupon);
    await saveCoupon.save();
    return res.status(200).send("Coupon Added Successfully");
}

module.exports.getCoupon = async (req, res) => {
    const allCoupon = await Coupon.find();
    return res.status(200).send(allCoupon);
}

module.exports.deleteCoupon = async (req, res) => {
    const couponId = req.params.id;
    await Coupon.deleteOne({ _id: couponId })
    return res.status(200).send("Delete Coupon SuccessFully")
}

module.exports.saveCoupon = async (req, res) => {
    const userId = req.user._id;
    const data = {
        userId: userId,
        amount: req.body.finalAmount,
    }
    const saveData = new Usedcoupon(data);
    await saveData.save();
    return res.status(200).send("Success");
}