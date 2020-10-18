const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

describe('Users Public API (/api/users)', function () {
    it('should GET status 401 trying to get all users', function (done) {
        requester.get('/api/users')
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 401 trying to get a user by id', function (done) {
        requester.get('/api/users/5f8c3fdd0ee4b721986d6826')
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 401 trying to add a new user', function (done) {
        const paramsObj = {
            "username": "newuser",
            "password": "mypassword"
        };
        requester.post('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 401 trying to update an existing user', function (done) {
        const paramsObj = {
            "_id": "5f8c3fdd0ee4b721986d6826",
            "username": "newuser",
            "password": "mypassword"
        };
        requester.put('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 401 trying to delete a user', function (done) {
        requester.delete('/api/users/5f8c3fdd0ee4b721986d6826')
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    after(function (done) {
        requester.close();
        done();
    });
});
