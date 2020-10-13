const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send('Sending from the /api root.');
});

router.use('/articles', require('./articlesController'));

router.use((req, res, next) => {
    const error = new Error('API route not found!');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    if (error.isJoi) {
        return res.status(400).json({ error: error.details[0].message });
    } else if (error instanceof RangeError) {
        return res.status(400).json({ error: error.message });
    }
    res.status(error.status || 500);
    error.status === 404 ? res.send(error.message) : res.send('Request failed... please check your request and try again!\n' + error.message);
});

module.exports = router;
