const express = require('express');
const router = express.Router();

const { signIn, signUp } = require('../controllers/userControllers');


router.route('/signup')
    .post(signUp)
    .get()

router.route('/signin')
    .post(signIn)
    .get()

module.exports = router;