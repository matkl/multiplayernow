/**
 * Provide req.games and req.tag.
 */
exports.load = (req, res, next) => {
  const tag = req.params.tag
    ? req.app.locals.config.tags[req.params.tag]
    : req.app.locals.config.home;
  if (!tag) return next('route');

  req.db.collection('games').find(Object.assign({
    technology: 'html5',
  }, req.params.tag ? { tags: req.params.tag } : null))
  .sort({ hearts: -1, posted: -1 })
  .toArray()
  .then((docs) => {
    req.games = docs;
    req.tag = tag;
    next();
  })
  .catch(next);
};

/**
 * GET /tags/:id
 * GET /
 */
exports.get = (req, res, next) => {
  if (!req.games) return next();

  res.render('tag', {
    games: req.games,
    title: req.tag.title,
    subtitle: req.tag.subtitle,
    description: req.tag.description,
  });
};
