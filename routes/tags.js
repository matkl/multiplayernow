const express = require('express');

const tags = require('../controllers/tags');

const router = express.Router();

router.get('/:tag', tags.load, tags.get);

module.exports = router;
