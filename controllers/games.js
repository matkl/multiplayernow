/**
 * Provide req.game.
 */
exports.load = (req, res, next) => {
  console.log('L1');
  req.db.collection('games').findOne({ _id: req.params.id })
  .then((doc) => {
    console.log('L2');
    console.log(req.game, req.path);
    req.game = doc;
    next();
  })
  .catch(next);
};

/**
 * GET /games/:id
 */
exports.get = (req, res, next) => {
  if (!req.game) return next();

  res.render('game', {
    title: req.game.name,
    game: req.game,
    header: false,
  });
};

/**
 * POST /games/:id/comments
 */
exports.postComment = (req, res, next) => {
  if (!req.game) return next();

  const error = err => next(new Error(err));

  if (!req.body.task) return error('wrong answer');
  if (parseInt(req.body.task.trim(), 10) !== 8) return error('wrong answer');

  const comment = {
    posted: new Date(),
    author: req.body.author && req.body.author.trim(),
    url: req.body.url && req.body.url.trim(),
    text: req.body.text && req.body.text.trim(),
  };

  if (!comment.author) return error('name missing');
  if (!comment.text) return error('text missing');

  if (comment.url && !/^https?:\/\//i.test(comment.url)) {
    comment.url = `http://${comment.url}`;
  }

  req.db.collection('games').updateOne({ _id: req.params.id }, {
    $push: { comments: comment },
  })
  .then(() => {
    res.send({});
  })
  .catch(next);
};
