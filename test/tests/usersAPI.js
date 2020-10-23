const agent = require('../utils/serverInit');
const { loginUser, loginSpecifiedUser } = require('./loginUser');
const logoutUser = require('./logoutUser');

let _id1 = '';
let _id2 = '';
let username1 = 'first_user';
let username2 = 'second_user';
let password = 'blahblah';

loginUser();

describe('Users (/api/users)', function () {
    it('should POST a new user using the provided params body and return the insertedId', function (done) {
        const paramsObj = {
            username: username1,
            password,
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertedId').and.to.be.a('string');
                if (response.body.insertedId) _id1 = response.body.insertedId;
                done();
            })
            .catch(error => done(error));
    });
});

logoutUser();

loginSpecifiedUser(username1, password);

describe('continue Users (/api/users)', function () {
    it('should GET the newly created user by _id', function (done) {
        agent
            .get('/api/users/' + _id1)
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf(1);
                response.body[0].should.have.all.keys('_id', 'username');
                response.body[0]._id.should.be.a('string');
                response.body[0].username.should.be.a('string');
                done();
            })
            .catch(error => done(error));
    });

    it('should POST a second new user using the provided params body and return a second insertedId', function (done) {
        const paramsObj = {
            username: username2,
            password,
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertedId').and.to.be.a('string');
                if (response.body.insertedId) _id2 = response.body.insertedId;
                done();
            })
            .catch(error => done(error));
    });

    it('should GET all users minus their passwords', function (done) {
        agent
            .get('/api/users')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf.at.least(2);
                response.body.forEach(function (element) {
                    element.should.have.all.keys('_id', 'username');
                    element._id.should.be.a('string');
                    element.username.should.be.a('string');
                });
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to GET a user and return status 401 because the _id does not match the logged in user', function (done) {
        agent
            .get('/api/users/abcdefabcdefabcdefabcdef')
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to POST a new user because the username is not unique', function (done) {
        const paramsObj = {
            username: username1,
            password,
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to POST a new user because the username is invalid', function (done) {
        const paramsObj = {
            username: '12345',
            password,
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to POST a new user because the password is invalid', function (done) {
        const paramsObj = {
            username: 'username11',
            password: '1234567',
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should update, via PUT, the newly created user with these new parameters', function (done) {
        const paramsObj = {
            _id: _id1,
            username: 'updated_user',
            password: 'updated_pass',
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(204);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT, the newly created user because that user is not signed in', function (done) {
        const paramsObj = {
            _id: _id2,
            username: 'updated_user',
            password: 'updated_pass',
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT, the newly created user and return an error because username is invalid', function (done) {
        const paramsObj = {
            _id: _id1,
            username: '12345',
            password: 'updated_pass',
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT, the newly created user and return an error because password is invalid', function (done) {
        const paramsObj = {
            _id: _id1,
            username: 'updated_user',
            password: '1234567',
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to DELETE the newly created user because the _id is invalid', function (done) {
        agent
            .delete('/api/users/abc')
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to DELETE the newly created user because the _id does not exist', function (done) {
        agent
            .delete('/api/users/abcdefabcdefabcdefabcdef')
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });
});

logoutUser();

describe('Test all the secure users route CRUD methods (/api/users) with the user not logged in', function () {
    it('should FAIL to GET all users because the user is not logged in', function (done) {
        agent
            .get('/api/users')
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to GET the newly created user by _id because the user is not logged in', function (done) {
        agent
            .get('/api/users/' + _id1)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to POST a new user using the provided params body because the user is not logged in', function (done) {
        const paramsObj = {
            username: 'some_new_user',
            password: 'blahblah',
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT, the newly created user using the provided params body because the user is not logged in', function (done) {
        const paramsObj = {
            _id: _id1,
            username: 'some_new_user',
            password: 'blahblah',
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to DELETE the newly created user using the _id because the user is not logged in', function (done) {
        agent
            .delete('/api/users/' + _id1)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });
});

loginUser();

describe('continue Users (/api/users)', function () {
    it('should DELETE the newly created user using the _id', function (done) {
        agent
            .delete('/api/users/' + _id1)
            .then(response => {
                response.should.have.status(204);
                done();
            })
            .catch(error => done(error));
    });

    it('should DELETE the second newly created user using the _id', function (done) {
        agent
            .delete('/api/users/' + _id2)
            .then(response => {
                response.should.have.status(204);
                done();
            })
            .catch(error => done(error));
    });
});
