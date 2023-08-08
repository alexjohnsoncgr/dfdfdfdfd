const express = require('express');
const router = express.Router();
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');
const { createNewCoupon, getCoupon, deleteCoupon, saveCoupon } = require('../controllers/couponController');

router.route('/')
    .post([authorize, admin], createNewCoupon)
    .get(authorize, getCoupon)


router.route('/:id')
    .delete([authorize, admin], deleteCoupon)

router.route('/saveCoupon')
    .post(authorize, saveCoupon)

module.exports = router;