const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const server = require('../app');

chai.use(chaiHttp);

const year = 2017;
const month = 1;
const category = 'rent';

const methods = [
  '/api/categories',
  `/api/data-groupby?m=${month}&y=${year}&cg=${category}`,
  `/api/data-details?m=${month}&y=${year}`,
  `/api/data-tableby?y=${year}`,
];

describe('Testing Dough Tracker API', () => {
  describe('GET /notfound', () => {
    it('it should return 404 ERROR', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  methods.forEach((url) => {
    describe(`GET ${url}`, () => {
      it('it should return 200 OK', (done) => {
        chai.request(server)
          .get(url)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('data');
            done();
          });
      });
    });
  });
});

