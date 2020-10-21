const agent = require('./utils/serverInit');
// const loginUser = require('./utils/loginUser');

describe('Test /api routes', function () {
    before(done => setTimeout(done, 500));

    const userCredentials = {
        "username": process.env.TEST_USER,
        "password": process.env.TEST_PASSWORD
    };

    const runTests = () => {
        require('./tests/articlesAPI');
        // require('./tests/usersAPI');
        // require('./tests/authAPI');
        require('./tests/cleanup');
    };

    const loginAndCheckStatus = () => {
        describe('Check the auth status of a user, login a user and retest the auth status of the user', function () {
            it('should GET the auth status of a user that is NOT logged in', function (done) {
                agent.get('/api/auth/status')
                    .then(response => {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.have.property('user').and.to.be.null;
                        done();
                    })
                    .catch(error => done(error));
            });

            it('should login a user, via POST', function (done) {
                agent.post('/api/auth/login')
                    .send(userCredentials)
                    .end(function (error, response) {
                        if (error) done(error);
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.have.property('user').and.to.be.an('object');
                        done();
                    });
            });

            // loginUser();

            it('should check and see if the user is logged in', function (done) {
                agent.get('/api/auth/status')
                    .end(function (error, response) {
                        if (error) done(error);
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.have.property('user').and.to.be.an('object');
                        if (response.status === 200) runTests();
                        done();
                    });
            });
        });
    };

    const checkRoutes = () => {
        it('should check and see if the API routes are ready', function (done) {
            agent.get('/api/test')
                .end(function (error, response) {
                    if (error) done(error);
                    response.should.have.status(200);
                    if (response.status === 200) loginAndCheckStatus();
                    done();
                });
        });
    };

    checkRoutes();
});
