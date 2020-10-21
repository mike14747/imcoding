const agent = require('./serverInit');

const loginUser = () => {
    const userCredentials = {
        "username": process.env.TEST_USER,
        "password": process.env.TEST_PASSWORD
    };

    describe('Login a user', function () {
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

module.exports = loginUser;
