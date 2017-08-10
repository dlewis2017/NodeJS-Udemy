const request = require('supertest');
const expect = require('expect');

//require local server app express program
var app = require('./server').app;

describe('Server', () => {
  describe('Get /', () => {
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found.'
          });
        })
        .end(done);
    });
  });
  describe('Get /users', () => {
    it('should return my user object', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'David',
            age: 22
          });
        })
        .end(done);
    });
  });
});
