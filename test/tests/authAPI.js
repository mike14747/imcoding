const agent = require('../utils/serverInit');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');

const userCredentials = {
    "username": process.env.TEST_USER,
    "password": process.env.TEST_PASSWORD
};

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

describe('Login user', function () {
    it('should fail to login a user, via POST, since the user is already logged in', function (done) {
        agent.post('/api/auth/login')
            .send(userCredentials)
            .then(response => {
                response.should.have.status(400);
                response.should.be.json;
                response.body.should.have.property('message').and.to.be.an('string');
                done();
            })
            .catch(error => done(error));
    });
});

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
