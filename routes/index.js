const home = require('./home');
const tags = require('./tags');
const games = require('./games');
const staticFiles = require('./static');

module.exports = {
  home,
  tags,
  games,
  static: staticFiles,
};
