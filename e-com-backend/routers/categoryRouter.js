const express = require('express');
const router = express.Router();
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

const { createCategory, getCategory } = require('../controllers/categoryControllers');


router.route('/')
    .post([authorize, admin], createCategory)
    .get(getCategory)


module.exports = router;