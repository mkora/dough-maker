const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const server = require('../app');

chai.use(chaiHttp);

describe('Testing API', () => {
  describe('GET /notfound', () => {
    it('it should return 404 ERROR', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(err).not.to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('GET /pulse', () => {
    it('it should return 200 OK', (done) => {
      chai.request(server)
        .get('/pulse')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });  
});

