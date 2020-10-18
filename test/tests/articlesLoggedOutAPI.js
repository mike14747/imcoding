const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

describe('Articles Public API (/api/articles)', function () {
    it('should GET all articles', function (done) {
        requester.get('/api/articles')
            .then(response => {
                response.should.have.status(200);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET a single article by slug', function (done) {
        requester.get('/api/articles/git')
            .then(response => {
                response.should.have.status(200);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 401 trying to add a new article', function (done) {
        const paramsObj = {
            "title": "new title",
            "description": "blah, blah",
            "markdown": "this is the markdown text"
        };
        requester.post('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 401 trying to update an existing article', function (done) {
        const paramsObj = {
            "_id": "5f852fbe7fc93e089450a188",
            "title": "some title",
            "description": "blah, blah",
            "markdown": "this is the markdown text"
        };
        requester.put('/api/articles')
            .send(paramsObj)
            .then(response => {
                response.should.have.status(401);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 401 trying to delete an article', function (done) {
        requester.delete('/api/articles/5f852fbe7fc93e089450a188')
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
