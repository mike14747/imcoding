require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();

// app.use(helmet());

app.use(
    helmet({
        contentSecurityPolicy: false,
    }),
);

// console.log(helmet.contentSecurityPolicy.getDefaultDirectives());

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             /* eslint-disable quotes */
//             'default-src': ["'self'"],
//             'base-uri': ["'self'"],
//             'block-all-mixed-content': [],
//             'font-src': ["'self'", 'https:', 'data:'],
//             'frame-ancestors': ["'self'"],
//             'img-src': ["'self'", 'data:'],
//             'object-src': ["'none'"],
//             'script-src': ["'self'", "'unsafe-inline'"],
//             // 'script-src-attr': ["'none'"],
//             'style-src': ["'self'", 'https:', "'unsafe-inline'"],
//             'upgrade-insecure-requests': [],
//             /* eslint-enable quotes */
//         },
//     }),
// );

const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { mongodbConnect } = require('./config/connectionPool');
app.use(require('./controllers/testController'));

mongodbConnect()
    .then(() => {
        app.use(require('./passport/expressSession'));
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        app.get('/api/*', (req, res) => {
            res.status(500).send('An error occurred connecting to the database! ' + error.message);
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
