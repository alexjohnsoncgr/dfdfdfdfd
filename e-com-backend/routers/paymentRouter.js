const express = require('express');
const router = express.Router();

const { initPayment, ipn, paymentSuccess, paymentFailed, paymentCanceled } = require('../controllers/paymentControllers');
const authorize = require('../middlewares/authorize');

router.route('/')
    .get(authorize, initPayment);

router.route('/ipn')
    .post(ipn);

router.route('/success')
    .post(paymentSuccess);

router.route('/failed')
    .post(paymentFailed);

router.route('/cancel')
    .post(paymentCanceled);

module.exports = router;