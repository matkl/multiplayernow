const express = require('express');
const path = require('path');
const logger = require('morgan');
const moment = require('moment');
const mongodb = require('mongodb');
const config = require('./config');
const routes = require('./routes');
const assets = require('./middleware/assets');
const canonical = require('./middleware/canonical');
const error = require('./controllers/error');

const app = express();

/**
 * Configure Express.
 */
app.set('trust proxy', 'loopback');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.locals.moment = moment;
app.locals.config = config;
app.locals.env = app.get('env');
if (app.get('env') !== 'test') app.use(logger('tiny'));

/**
 * Routing.
 */
app.use('/', routes.static);
app.use(assets);
app.use(canonical);
app.use('/tags', routes.tags);
app.use('/games', routes.games);
app.use('/', routes.home);
app.use(error.notFound);

/**
 * Connect to MongoDB.
 */
mongodb.MongoClient.connect(config.db).then((db) => {
  // Export database to req.db.
  express.request.db = db;
  app.set('db', db);
  app.emit('dbReady', db);
}).catch((err) => {
  throw err;
});

module.exports = app;
