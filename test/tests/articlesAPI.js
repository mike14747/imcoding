const agent = require('../utils/serverInit');
const { loginUser } = require('./loginUser');
const logoutUser = require('./logoutUser');

let slug = '';
let _id = '';

loginUser();

describe('Articles (/api/articles)', function () {
    it('should POST a new article using the provided params body and return the inserted slug', function (done) {
        const paramsObj = {
            title: 'new title',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('slug').and.to.be.a('string');
                if (response.body.slug) slug = response.body.slug;
                done();
            })
            .catch(error => done(error));
    });

    it('should GET the newly created article by the slug', function (done) {
        agent
            .get('/api/articles/' + slug)
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf(1);
                response.body[0].should.include.all.keys('_id', 'title', 'markdown', 'slug', 'createdAt');
                response.body[0].should.not.have.all.keys('description', 'updatedAt');
                response.body[0]._id.should.be.a('string');
                response.body[0].title.should.be.a('string');
                if (response.body[0].description) response.body[0].description.should.be.a('string');
                response.body[0].markdown.should.be.a('string');
                response.body[0].slug.should.be.a('string');
                response.body[0].createdAt.should.be.a('string');
                if (response.body[0].updatedAt) response.body[0].updatedAt.should.be.a('string');
                if (response.body[0]._id) _id = response.body[0]._id;
                done();
            })
            .catch(error => done(error));
    });

    it('should GET all articles minus the markdown code', function (done) {
        agent
            .get('/api/articles')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.include.all.keys('_id', 'title', 'slug', 'createdAt');
                    element.should.not.have.all.keys('description', 'updatedAt');
                    element._id.should.be.a('string');
                    element.title.should.be.a('string');
                    if (element.description) element.description.should.be.a('string');
                    element.slug.should.be.a('string');
                    element.createdAt.should.be.a('string');
                    if (element.updatedAt) element.updatedAt.should.be.a('string');
                    if (element._id) _id = element._id;
                });
                done();
            })
            .catch(error => done(error));
    });

    it('should GET a status 200 and an empty array because slug 0 should not match any articles', function (done) {
        agent
            .get('/api/articles/0')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf(0);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET the details of the latest articles for the homepage', function (done) {
        agent
            .get('/api/articles/latest/details')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.include.all.keys('title', 'slug', 'createdAt');
                    element.should.not.have.all.keys('description');
                    element.title.should.be.a('string');
                    if (element.description) element.description.should.be.a('string');
                    element.slug.should.be.a('string');
                    element.createdAt.should.be.a('string');
                });
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to POST a new article because the article slug is not unique', function (done) {
        const paramsObj = {
            title: 'new title',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to POST a new article because the title is invalid', function (done) {
        const paramsObj = {
            title: '',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to POST a new article because the markdown is invalid', function (done) {
        const paramsObj = {
            title: 'new title2',
            description: 'this is the new article description',
            markdown: '',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should update, via PUT, the newly created article with these new parameters', function (done) {
        const paramsObj = {
            _id: _id,
            title: 'updated title',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .put('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                response.body.should.have.property('slug').and.to.be.a('string');
                if (response.body.slug) slug = response.body.slug;
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT the newly created article and return an error because _id is invalid', function (done) {
        const paramsObj = {
            _id: 0,
            title: 'updated title',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT the newly created article and return an error because _id does not exist', function (done) {
        const paramsObj = {
            _id: 'abcdefabcdefabcdefabcdef',
            title: 'updated title',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT the newly created article and return an error because title is invalid', function (done) {
        const paramsObj = {
            _id: _id,
            title: '',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT the newly created article and return an error because description is invalid', function (done) {
        const paramsObj = {
            _id: _id,
            title: 'updated title',
            description: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT the newly created article and return an error because markdown is invalid', function (done) {
        const paramsObj = {
            _id: _id,
            title: 'updated title',
            description: 'this is the new article description',
            markdown: '',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to DELETE the newly created article because the _id param was not included', function (done) {
        agent
            .delete('/api/articles')
            .then(response => {
                response.should.have.status(404);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to DELETE the newly created article because the _id param does not exist', function (done) {
        agent
            .delete('/api/articles/abcdefabcdefabcdefabcdef')
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to DELETE the newly created article because the _id param is invalid', function (done) {
        agent
            .delete('/api/articles/0')
            .then(response => {
                response.should.have.status(400);
                done();
            })
            .catch(error => done(error));
    });

});

logoutUser();

describe('Test all the secure articles route CRUD methods (/api/articles) with the user not logged in', function () {
    it('should FAIL to POST a new article using the provided params body because the user is not logged in', function (done) {
        const paramsObj = {
            title: 'new title',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to update, via PUT, a new article using the provided params body because the user is not logged in', function (done) {
        const paramsObj = {
            _id: _id,
            title: 'updated title',
            description: 'this is the new article description',
            markdown: '### This is the article header',
        };
        agent
            .put('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should FAIL to DELETE the newly created article using the _id because the user is not logged in', function (done) {
        agent
            .delete('/api/articles/' + _id)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });
});

loginUser();

describe('continue Articles (/api/articles)', function () {
    it('should DELETE the newly created article using the _id', function (done) {
        agent
            .delete('/api/articles/' + _id)
            .then(response => {
                response.should.have.status(204);
                done();
            })
            .catch(error => done(error));
    });
});

logoutUser();
