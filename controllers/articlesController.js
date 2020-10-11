const router = require('express').Router();
const Article = require('../models/article');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Article.getAllArticlesMinusMarkdown();
        if (data[0].createdAt) data[0].createdAt = data[0].createdAt.toLocaleDateString();
        if (data[0].updatedAt) data[0].updatedAt = data[0].updatedAt.toLocaleDateString();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:_id', async (req, res, next) => {
    try {
        const [data, error] = await Article.getArticleById(req.params._id);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
