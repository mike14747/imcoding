const agent = require('../utils/serverInit');
const { loginUser, loginSpecifiedUser } = require('./loginUser');
const logoutUser = require('./logoutUser');

let _id = '';
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
                if (response.body.insertedId) _id = response.body.insertedId;
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
            .get('/api/users/' + _id)
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
});

// should POST a second new user using the provided params body and return a second insertedId


// should GET the newly created user by _id


// should GET all users minus their passwords


// should GET a status 200 and an empty array because the _id should not match any users


// should FAIL to POST a new user because the username is not unique


// should FAIL to POST a new user because the username is invalid


// should FAIL to POST a new user because the password is invalid


// should update, via PUT, the newly created user with these new parameters


// should FAIL to update, via PUT, the newly created user because that user isn't signed in


// should FAIL to update, via PUT the newly created user and return an error because _id does not exist


// should FAIL to update, via PUT the newly created user and return an error because _id is invalid


// should FAIL to update, via PUT the newly created user and return an error because username is invalid


// should FAIL to update, via PUT the newly created user and return an error because password is invalid


// DELETE tests


logoutUser();

describe('Test all the user route CRUD methods (/api/users), which are all secure, with the user not logged in', function () {
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
            .get('/api/users/' + _id)
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
            _id: _id,
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
            .delete('/api/users/' + _id)
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
            .delete('/api/users/' + _id)
            .then(response => {
                response.should.have.status(204);
                done();
            })
            .catch(error => done(error));
    });
});
