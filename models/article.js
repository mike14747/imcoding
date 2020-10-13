const db = require('../config/connectionPool').getDb();
// const ObjectID = require('mongodb').ObjectID;

const Article = {
    getAllArticlesMinusMarkdown: async () => {
        try {
            const result = await db.collection('articles').find().project({ markdown: 0 }).sort({ title: 1 }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getArticleBySlug: async (slug) => {
        try {
            const result = await db.collection('articles').find({ slug }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Article;
