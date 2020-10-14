// you'll need to make sure your connectionPool.js file is exporting the client for this sessionStore... in addition to exporting the client.db() (which is used by the models)
const client = require('../config/connectionPool').getClient();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionOptions = {
    client: client,
    touchAfter: 24 * 3600,
};

const sessionStore = new MongoStore(sessionOptions);

module.exports = sessionStore;
