const agent = require('../utils/serverInit');
const { loginUser, duplicateLogin } = require('./loginUser');
const logoutUser = require('./logoutUser');

describe('Auth (/api/auth)', function () {
    it('should return user status as NULL because the user is not logged in', function (done) {
        agent.get('/api/auth/status')
            .then(response => {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.null;
                done();
            })
            .catch(error => done(error));
    });

});

loginUser();

duplicateLogin();

describe('continue Auth (/api/auth)', function () {

    it('should return the user object', function (done) {
        agent.get('/api/auth/status')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.an('object');
                done();
            });
    });
});

logoutUser();
