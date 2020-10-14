const Article = require('../../models/article');

const isArticleSlugUnique = async (slug, _id = null) => {
    const [data, error] = await Article.getArticleSlugBySlug(slug, _id);
    if (error) throw new Error(error);
    if (data && data.length > 0) throw new RangeError('article slug "' + slug + '" is not unique!');
};

module.exports = isArticleSlugUnique;
