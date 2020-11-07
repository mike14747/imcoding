const Joi = require('joi');

const idError = '"_id" fields must be a string of 24 hex characters';

const articleSchema = Joi.object({
    _id: Joi.optional(),
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(0).max(255).allow('').required(),
    markdown: Joi.string().min(1).required(),
    slug: Joi.string().min(1).required(),
});

const articleIdSchema = Joi.object({
    _id: Joi.string().hex().length(24).messages({
        'string.base': idError,
        'string.hex': idError,
        'string.length': idError,
    }).required(),
});

module.exports = {
    articleSchema,
    articleIdSchema,
};
