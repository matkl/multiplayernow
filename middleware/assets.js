const fs = require('fs');
const path = require('path');

function readAssets() {
  return {
    css: fs.readFileSync(path.join(__dirname, '../build/style.css')),
  };
}

const assets = readAssets();

module.exports = (req, res, next) => {
  if (req.app.get('env') === 'development') {
    res.locals.assets = readAssets();
    return next();
  }
  res.locals.assets = assets;
  next();
};
