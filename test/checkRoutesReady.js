const agent = require('./utils/serverInit');
const loginUser = require('./tests/loginUser');

describe('Test /api routes', function () {
    before(done => setTimeout(done, 500));

    const runTests = () => {
        require('./tests/articlesAPI');
        // require('./tests/usersAPI');
        // require('./tests/authAPI');
        require('./tests/cleanup');
    };

    const loginAndCheckStatus = () => {
        describe('Check the auth status of a user', function () {
            it('should return NULL because the user is not logged in', function (done) {
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

        // require('./tests/loginUser');

        loginUser();

        describe('Check the auth status of a user', function () {
            it('should return the user object', function (done) {
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
