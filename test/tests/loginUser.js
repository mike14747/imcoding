const agent = require('../utils/serverInit');

const userCredentials = {
    "username": process.env.TEST_USER,
    "password": process.env.TEST_PASSWORD
};

const loginUser = () => {
    describe('Login user', function () {
        it('should login a user, via POST', function (done) {
            agent.post('/api/auth/login')
                .send(userCredentials)
                .then(response => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.should.have.property('user').and.to.be.an('object');
                    done();
                })
                .catch(error => done(error));
        });
    });
};

const duplicateLogin = () => {
    describe('Duplicate user login', function () {
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
};

module.exports = {
    loginUser,
    duplicateLogin,
};
