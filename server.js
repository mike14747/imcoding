require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'User must be logged in to access these routes!' });
        // return next();
    }
}

const { mongodbConnect } = require('./config/connectionPool');
app.use(require('./controllers/testController'));

mongodbConnect()
    .then(() => {
        // app.use(require('./passport/expressSession'));
        // const passport = require('./passport/passportFunctions');
        // app.use(passport.initialize());
        // app.use(passport.session());
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.log('inside the catch in server.js:', error);
        app.get('/api/*', (req, res) => {
            res.status(500).json({ message: 'An error occurred connecting to the database! ' + error.message });
        });
    })
    .finally(() => {
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, 'client/build')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client/build/index.html'));
            });
        }
    });

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

module.exports = app;
