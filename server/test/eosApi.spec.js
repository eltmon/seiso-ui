'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

module.exports = function(app) {
  describe('Seiso UI API Specification - Eos Api', () => {

    describe('Unauthorized requests should prevent invocation', () => {

      it('should prevent deploy', (done) => {
        chai.request(app)
          .post('/eos/deploy')
          .end((err, res) => {
            expect(err).to.not.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('msg');
            expect(res.body.msg).to.equal('Not Authorized.');
            done();
          });
      });

      it('should prevent convict', (done) => {
        chai.request(app)
          .post('/eos/convict')
          .end((err, res) => {
            expect(err).to.not.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('msg');
            expect(res.body.msg).to.equal('Not Authorized.');
            done();
          });
      });
      it('should prevent interrogate', (done) => {
        chai.request(app)
          .post('/eos/interrogate')
          .end((err, res) => {
            expect(err).to.not.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('msg');
            expect(res.body.msg).to.equal('Not Authorized.');
            done();
          });
      });
      it('should prevent maintenanceMode', (done) => {
        chai.request(app)
          .post('/eos/maintenanceMode')
          .end((err, res) => {
            expect(err).to.not.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('msg');
            expect(res.body.msg).to.equal('Not Authorized.');
            done();
          });
      });
      it('should prevent setActive', (done) => {
        chai.request(app)
          .post('/eos/setActive')
          .end((err, res) => {
            expect(err).to.not.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('msg');
            expect(res.body.msg).to.equal('Not Authorized.');
            done();
          });
      });
      it('should prevent soak', (done) => {
        chai.request(app)
          .post('/eos/soak')
          .end((err, res) => {
            expect(err).to.not.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('msg');
            expect(res.body.msg).to.equal('Not Authorized.');
            done();
          });
      });

    });
  });
}