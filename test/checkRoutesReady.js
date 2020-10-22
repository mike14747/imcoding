const agent = require('./utils/serverInit');

describe('Test /api routes', function () {
    // before(done => setTimeout(done, 500));

    const runTests = () => {
        require('./tests/authAPI');
        require('./tests/articlesAPI');
        // require('./tests/usersAPI');
        require('./tests/cleanup');
    };


    const checkRoutes = () => {
        it('should check and see if the API routes are ready', function (done) {
            agent.get('/api/test')
                .end(function (error, response) {
                    if (error) done(error);
                    response.should.have.status(200);
                    if (response.status === 200) runTests();
                    done();
                });
        });
    };

    checkRoutes();
});
