const crypto = require('crypto');
const request = require('supertest'); // eslint-disable-line import/no-extraneous-dependencies
const app = require('../app');

function shouldRender(path) {
  return request(app).get(path).expect(200);
}

function testPath(path, method = 'get') {
  describe(`${method.toUpperCase()} ${path}`, () => {
    it('should render', () => shouldRender(path));
  });
}

function randomStr(n = 32) {
  return crypto.randomBytes(n).toString('hex');
}

/**
 * Set up database.
 */
before((done) => {
  app.on('dbReady', () => done());
});

/**
 * Add a game to the database to run tests on.
 */
before(() => (
  app.get('db').collection('games').replaceOne({ _id: '__test-game' }, {
    name: 'Test Game',
    url: 'http://example.org',
    technology: 'html5',
    description: randomStr(32),
    tags: 'action',
    posted: new Date(),
  }, { upsert: true })
));

/**
 * Clean up database.
 */
after(() => (
  app.get('db').collection('games').deleteOne({ _id: '__test-game' })
));

describe('GET /', () => {
  it('should return 200', () => shouldRender('/'));

  it('should return 404 for invalid requests', () => (
    request(app)
    .get(`/${randomStr(32)}`)
    .expect(404)
  ));
});

describe('GET /tags/:id', () => {
  it('should return 200', () => shouldRender('/tags/action'));

  it('should return 404 for unknown tags', () => (
    request(app)
    .get(`/tags/${randomStr(32)}`)
    .expect(404)
  ));
});

testPath('/add-game');

describe('POST /add-game', () => {
  it('should allow to submit games', () => (
    request(app)
    .post('/add-game')
    .field('url', 'http://example.org')
    .field('task', '8')
    .expect(res => res.body.url === 'http://example.org')
    .expect(200)
  ));
});

describe('GET /games/:id', () => {
  it('should return 200', () => shouldRender('/games/__test-game'));
  it('should return 404 for unknown games', () => (
    request(app)
    .get(`/games/${randomStr(32)}`)
    .expect(404)
  ));
});

describe('POST /games/:id/comments', () => {
  it('should post a comment', () => (
    request(app)
    .post('/games/__test-game/comments')
    .field('text', randomStr(32))
    .field('author', randomStr(8))
    .field('task', '8')
    .expect(200)
  ));
});

testPath('/sitemap.xml');
