const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const { createCartItem, getCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartControllers');

router.route('/')
    .get(authorize, getCartItem)
    .post(authorize, createCartItem)
    .put(authorize, updateCartItem)

router.route('/:id')
    .delete(authorize, deleteCartItem)

module.exports = router;