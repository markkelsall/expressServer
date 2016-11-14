let assert = require('assert');
let Server = require('../server');
let request = require('supertest');

let serverInstance;
describe('Server', function() {
    beforeEach(function () {
        serverInstance = new Server();
    });
    afterEach(function () {
        serverInstance.close();
    });
    it('should start an instance on port 8080 if a port is not provided', function(done) {
        assert.equal(serverInstance.getInstance().address().port, '8080');
        done();
    });
});
