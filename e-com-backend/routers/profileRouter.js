const express = require('express');
const authorize = require('../middlewares/authorize');
const router = express.Router();
const { getProfile, setProfile } = require('../controllers/profileController');

router.route('/')
    .get(authorize, getProfile)
    .post(authorize, setProfile)

module.exports = router;