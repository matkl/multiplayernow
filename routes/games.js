const express = require('express');

const cors = require('../middleware/cors');
const body = require('../middleware/body');
const games = require('../controllers/games');

const router = express.Router();

router.get('/:id', games.load, games.get);
router.post('/:id/comments', cors, body.form, games.load, games.postComment);

module.exports = router;
