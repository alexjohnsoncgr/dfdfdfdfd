const express = require('express');
const router = express.Router();
const { searchResult } = require('../controllers/searchController');

router.route('/:search')
    .get(searchResult);

module.exports = router;