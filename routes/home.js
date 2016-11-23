const express = require('express');
const cors = require('../middleware/cors');
const body = require('../middleware/body');
const tags = require('../controllers/tags');
const addGame = require('../controllers/add-game');
const sitemap = require('../controllers/sitemap');

const router = express.Router();

router.get('/', tags.load, tags.get);
router.get('/add-game', addGame.get);
router.post('/add-game', cors, body.form, addGame.post);
router.get('/sitemap.xml', sitemap.getXML);

module.exports = router;
