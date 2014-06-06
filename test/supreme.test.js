describe('omega supreme', function () {
  'use strict';

  var assume = require('assume')
    , Primus = require('primus')
    , omega = require('../');

  var port = 1024
    , server
    , http;

  beforeEach(function each(next) {
    http = require('http').createServer();

    server = new Primus(http, {
      transformer: 'websockets'
    });

    http.port = port++;
    http.listen(http.port, next);
  });

  afterEach(function each(next) {
    server.destroy(next);
  });

  it('is exposed as function', function () {
    assume(omega).to.be.a('function');
  });

  it('exposes a plugin interface', function () {
    assume(omega.server).to.be.a('function');
    server.use('omega-supreme', omega);
  });

  describe('.forward', function () {
    it('adds a .forward method', function () {
      assume(server.forward).to.be.undefined();
      server.use('omega-supreme', omega);
      assume(server.forward).to.be.a('function');
    });
  });
});
