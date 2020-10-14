const router = require('express').Router();
const Article = require('../models/article');
const slugify = require('slugify');
const { articleSchema, articleIdSchema } = require('./validation/schema/articleSchema');
const isArticleSlugUnique = require('./validation/helpers/isArticleSlugUnique');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Article.getAllArticlesMinusMarkdown();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:slug', async (req, res, next) => {
    try {
        const [data, error] = await Article.getArticleBySlug(req.params.slug);
        if (data[0] && data[0].createdAt) data[0].createdAt = data[0].createdAt.toLocaleDateString();
        if (data[0] && data[0].updatedAt) data[0].updatedAt = data[0].updatedAt.toLocaleDateString();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown,
            slug: slugify(req.body.title, { lower: true, strict: true }),
        };
        await articleSchema.validateAsync(paramsObj);
        await isArticleSlugUnique(paramsObj.slug, req.body._id);
        const [data, error] = await Article.addNewArticle(paramsObj);
        if (error) return next(error);
        data && data.insertedId ? res.status(201).json({ slug: paramsObj.slug }) : res.status(400).json({ msg: 'New article was not added!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown,
            slug: slugify(req.body.title, { lower: true, strict: true }),
        };
        await articleIdSchema.validateAsync({ _id: req.body._id });
        await articleSchema.validateAsync(paramsObj);
        await isArticleSlugUnique(paramsObj.slug, req.body._id);
        paramsObj._id = req.body._id;
        const [data, error] = await Article.updateArticleById(paramsObj);
        if (error) return next(error);
        data && data.modifiedCount === 1 ? res.status(200).json({ slug: paramsObj.slug }) : res.status(400).send('Article was not updated!');
    } catch (error) {
        next(error);
    }
});

router.delete('/:articleid', async (req, res, next) => {
    try {
        await articleIdSchema.validateAsync({ _id: req.params.articleid });
        const [data, error] = await Article.deleteArticleById(req.params.articleid);
        if (error) return next(error);
        data && data.deletedCount === 1 ? res.status(204).end() : res.status(400).json({ msg: 'Article was not deleted!' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
