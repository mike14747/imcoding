const router = require('express').Router();

router.use('/articles', require('./articlesController'));
router.use('/auth', require('./authController'));
router.use('/users', require('./usersController'));

router.use((req, res, next) => {
    const error = new Error('API route not found!');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    console.log('errorHandingController.js', error);
    if (error.isJoi) {
        return res.status(400).send(error.message);
    } else if (error instanceof RangeError) {
        return res.status(400).send(error.message);
    }
    res.status(error.status || 500);
    console.log('the error is being sent in the "res.status(error.status || 500);" part of errorHandingController.js');
    error.status === 404 ? res.send(error.message) : res.send('Request failed... please check your request and try again!\n' + error.message);
});

module.exports = router;
