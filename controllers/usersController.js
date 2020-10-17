const router = require('express').Router();
const User = require('../models/user');
const { userSchema } = require('./validation/schema/userSchema');
const bcryptjs = require('bcryptjs');
const checkAuthenticated = require('./utils/checkAuthenticated');

router.get('/:_id', checkAuthenticated, async (req, res, next) => {
    res.send('sending from the /api/users/' + req.params._id + ' route');
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            username: req.body.username,
            password: req.body.password,
        };
        await userSchema.validateAsync(paramsObj);
        const saltRounds = 10;
        const hash = bcryptjs.hashSync(paramsObj.password, saltRounds);
        paramsObj.password = hash;
        const [data, error] = await User.addNewUser(paramsObj);
        if (error) return next(error);
        data && data.insertedId ? res.status(201).json({ insertedId: data.insertedId }) : res.status(400).json({ error: 'An error occurred trying to add the new record.' });
    } catch (error) {
        console.log('the error is being sent from the catch block of the /api/users POST route');
        next(error);
    }
});

router.put('/', checkAuthenticated, async (req, res, next) => {
    try {
        res.status(299).send('/api/users PUT route');
    } catch (error) {
        next(error);
    }
});

router.delete('/:_id', checkAuthenticated, async (req, res, next) => {
    try {
        res.status(299).send('/api/users DELETE route');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
