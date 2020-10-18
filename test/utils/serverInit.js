const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

module.exports = {
    agent: chai.request.agent(app),
    request: chai.request(app),
};
