const router = require('express').Router();

router.use('/articles', require('./articlesController'));
router.use('/auth', require('./authController'));

module.exports = router;
