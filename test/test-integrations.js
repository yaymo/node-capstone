const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');


const app = server.app;
chai.use(chaiHttp);

describe('initial get request tests', () => {
  it('should return initial request status', () => {
    return chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
      });
  });
});
