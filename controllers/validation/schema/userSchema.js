const Joi = require('joi');

const idError = '"_id" fields must be a string of 24 hex characters';
const usernameError = 'The "username" field must be from 6 to 15 characters in length.';
const passwordError = 'The "password" field must be from 8 to 20 characters in length.';

const userSchema = Joi.object({
    _id: Joi.string().hex().length(24).messages({
        'string.base': idError,
        'string.hex': idError,
        'string.length': idError,
    }).optional(),
    username: Joi.string().min(6).max(15).messages({
        'string.base': usernameError,
        'string.min': usernameError,
        'string.max': usernameError,
    }).required(),
    password: Joi.string().min(8).max(20).messages({
        'string.base': passwordError,
        'string.min': passwordError,
        'string.max': passwordError,
    }).required(),
});

const userIdSchema = Joi.object({
    _id: Joi.string().hex().length(24).messages({
        'string.base': idError,
        'string.hex': idError,
        'string.length': idError,
    }).required(),
});

module.exports = {
    userSchema,
    userIdSchema,
};
