/* eslint-disable no-console */

const app = require('./app');

app.on('dbReady', () => {
  /**
   * Start HTTP server.
   */
  app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}.`);
  });
});
