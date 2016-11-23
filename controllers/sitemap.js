const config = require('../config');

/**
 * GET /sitemap.xml
 */
exports.getXML = (req, res, next) => {
  const base = config.origin;

  const sitemap = [
    { loc: `${base}/`, changefreq: 'daily' },
  ];

  sitemap.push(...Object.keys(req.app.locals.config.tags).map(key => (
    { loc: `${base}/tags/${key}`, changefreq: 'daily' }
  )));

  req.db.collection('games').find().toArray()
  .then((docs) => {
    sitemap.push(...docs.map(doc => (
      { loc: `${base}/games/${doc._id}`, changefreq: 'daily' }
    )));

    res.header('Content-Type', 'application/xml');
    res.render('sitemap', { sitemap });
  })
  .catch(next);
};
