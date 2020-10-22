const agent = require('../utils/serverInit');
const logoutUser = require('./logoutUser');

logoutUser();

describe('Close agent', function () {
    it('should close the agent', function (done) {
        agent.close();
        done();
    });
});