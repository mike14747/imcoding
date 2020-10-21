const agent = require('../utils/serverInit');

describe('Test cleanup', function () {
    it('should logout the user that was logged in during tests and close the agent', function (done) {
        agent
            .get('/api/auth/logout')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.null;
                done();
            });
    });

    after(function (done) {
        agent.close();
        done();
    });
});