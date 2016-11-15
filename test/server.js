let assert = require('assert');
let Server = require('../server');
let request = require('supertest');

let serverInstance;
let serverConfig = {
    port: 8000,
    address: 'test'
};

describe('Server', function() {
    afterEach(function () {
        serverInstance.close();
    });
    it('should start an instance on port 8080 if a port is not provided', function(done) {
        serverInstance = new Server();
        assert.equal(serverInstance.getInstance().address().port, '8080');
        done();
    });
    it('should start an instance with a default address of / if one is not provided', function(done) {
        serverInstance = new Server();
        assert.equal(serverInstance.getInstance().address().address, '::');
        done();
    });
    it('should start an instance on the port provided', function(done) {
        serverInstance = new Server(serverConfig);
        assert.equal(serverInstance.getInstance().address().port, '8000');
        done();
    });
});
