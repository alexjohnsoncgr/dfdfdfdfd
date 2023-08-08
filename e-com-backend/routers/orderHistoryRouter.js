const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const { loadOrderHistory } = require('../controllers/orderController');


router.route('/')
    .get(authorize, loadOrderHistory)


module.exports = router;