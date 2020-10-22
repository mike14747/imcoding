const agent = require('../utils/serverInit');

const logoutUser = () => {
    describe('Logout user', function () {
        it('should logout the user', function (done) {
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
    });
};

module.exports = logoutUser;
