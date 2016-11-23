const config = require('../config');

module.exports = (req, res, next) => {
  const allowOrigin = req.app.get('env') === 'development' ? '*' : 'https://cdn.ampproject.org/';
  const allowSourceOrigin = req.app.get('env') === 'development' ? 'http://localhost:3000' : config.origin;
  res.header('Access-Control-Allow-Origin', allowOrigin);
  res.header('AMP-Access-Control-Allow-Source-Origin', allowSourceOrigin);
  res.header('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
  next();
};
