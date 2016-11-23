const config = require('../config');

module.exports = (req, res, next) => {
  res.locals.canonical = `${config.origin}${req.originalUrl}`;
  next();
};
