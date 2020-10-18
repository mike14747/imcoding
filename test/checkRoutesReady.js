const { agent, request } = require('./utils/serverInit');

describe('Test /api routes', function () {
    const userCredentials = {
        "username": process.env.TEST_USER,
        "password": process.env.TEST_PASSWORD
    };

    const runTests = () => {
        // require('./tests/usersLoggedOutAPI');
        // require('./tests/usersLoggedInAPI');
        // require('./tests/articlesLoggedOutAPI');
        // require('./tests/articlesLoggedInAPI');
        // require('./tests/authLoggedOutAPI');
        // require('./tests/authLoggedInAPI');
        require('./tests/cleanup');
    };

    const loginUser = () => {
        describe('Check the auth status of a user, login a user and test that login status', function () {
            it('should GET the auth status of a user not being logged in', function (done) {
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
                    if (response.status === 200) loginUser();
                    response.should.have.status(200);
                    done();
                });
        });
    };

    checkRoutes();
});

// const app = require('../server');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.should();
// chai.use(chaiHttp);
// const requester = chai.request(app).keepOpen();

// describe('Test user routes without being logged in', function () {
//     const runTests = () => {
//         require('./tests/articlesLoggedOutAPI');
//         require('./tests/usersLoggedOutAPI');
//     };

//     const checkRoutes = () => {
//         it('should check and see if the API routes are ready', function (done) {
//             requester.get('/api/test')
//                 .end(function (error, response) {
//                     if (error) done(error);
//                     if (response.status === 200) runTests();
//                     response.should.have.status(200);
//                     done();
//                 });
//         });
//     };

//     checkRoutes();

//     after(function (done) {
//         requester.close();
//         done();
//     });
// });