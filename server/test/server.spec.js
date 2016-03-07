'use strict';

var chai = require('chai'),
  expect = chai.expect,
  chaiHttp = require('chai-http');

chai.use(chaiHttp);
var app = require('../index.js').app;

describe('Seiso UI API Specification', () => {

  describe('config', () => {
    var config = require('../../config');
    it('configuration should have set values', (done) => {
      for (var k in config) {
        expect(config[k]).to.be.ok;
      }
      done();
    });
  });

  describe('static content routes', () => {

    it('GET to / should send index.html', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.header('content-type', 'text/html; charset=UTF-8');
          expect(res).to.be.html;
          expect(res).to.have.status(200);
          done();
        });      
    });

    it('GET to /index.html should send homepage', (done) => {
      chai.request(app)
        .get('/index.html')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.header('content-type', 'text/html; charset=UTF-8');
          expect(res).to.be.html;
          expect(res).to.have.status(200);
          done();
        });      
    });

    it('GET to /apiConfig should sent external API endpoints', (done) => {
      chai.request(app)
        .get('/getApiConfig')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('apiEndpoints');
          done();
        });      
    });

    it('GET to /instances should send expected client config', (done) => {
      chai.request(app)
        .get('/instances')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('instances');
          expect(res.body).to.have.property('current_instance');
          expect(res.body).to.have.property('show_actions');
          done();
        });
    });
  });

  describe('Auth routes and integration', () => {

    it('GET to /login should 401 if configuration is not set.', (done) => {
      chai.request(app)
        .get('/login')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.redirect;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('/logout should redirect to index', (done) => {
      chai.request(app)
        .get('/logout')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('/checkAuth should send valid response', (done) => {
      chai.request(app)
        .get('/checkAuth')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.property('body');
          expect(res.body).to.have.property('authenticated');
          expect(res.body.authenticated).to.equal(false);
          done();
        });
    });

    it('/login-failed should redirect to index', (done) => {
      chai.request(app)
        .get('/login-failed')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.redirect;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('/sp/metadata.xml should generate SP xml data for IDP', (done) => {
      chai.request(app)
        .get('/sp/metadata.xml')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.xml;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('App api safety', () => {

    it('non-existent routes should 404', (done) => {
      chai.request(app)
        .get('/abc')
        .end((err, res) => {
          expect(err).to.be.not.null;
          expect(res).to.have.status(404);
          done();
        });
    });

    it('non-existent routes should 404', (done) => {
      chai.request(app)
        .get('/loggin')
        .end((err, res) => {
          expect(err).to.be.not.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

require('./eosApi.spec.js')(app);
