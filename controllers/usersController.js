const router = require('express').Router();
const User = require('../models/user');
const userSchema = require('./validation/schema/userSchema');
const bcryptjs = require('bcryptjs');
const checkAuthenticated = require('./utils/checkAuthenticated');
const isUsernameUnique = require('./validation/helpers/isUsernameUnique');
const saltRounds = 10;

router.get('/:_id', checkAuthenticated, async (req, res, next) => {
    if (req.params._id !== req.user._id) return res.status(401).send('Mismatch in user id!');
    res.send('sending from the /api/users/' + req.params._id + ' route');
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            username: req.body.username,
            password: req.body.password,
        };
        await userSchema.validateAsync(paramsObj);
        await isUsernameUnique(paramsObj.username);
        const hash = bcryptjs.hashSync(paramsObj.password, saltRounds);
        paramsObj.password = hash;
        const [data, error] = await User.addNewUser(paramsObj);
        if (error) return next(error);
        data && data.insertedId ? res.status(201).json({ insertedId: data.insertedId }) : res.status(400).json({ error: 'An error occurred trying to add the new record.' });
    } catch (error) {
        next(error);
    }
});

router.put('/', checkAuthenticated, async (req, res, next) => {
    try {
        if (req.body._id !== req.user._id) return res.status(401).send('Mismatch in user id!');
        const paramsObj = {
            _id: req.body._id,
            username: req.body.username,
            password: req.body.password,
        };
        await userSchema.validateAsync(paramsObj);
        await isUsernameUnique(paramsObj.username, req.body._id);
        const hash = bcryptjs.hashSync(paramsObj.password, saltRounds);
        paramsObj.password = hash;
        const [data, error] = await User.updateUserById(paramsObj);
        if (error) return next(error);
        data && data.modifiedCount === 1 ? res.status(204).end() : res.status(400).send('User was not updated!');
    } catch (error) {
        next(error);
    }
});

router.delete('/:_id', checkAuthenticated, async (req, res, next) => {
    try {
        if (req.params._id !== req.user._id) return res.status(401).send('Mismatch in user id!');
        const [data, error] = await User.deleteUserById(req.params._id);
        if (error) return next(error);
        data && data.deletedCount === 1 ? res.status(204).end() : res.status(400).json({ msg: 'User was not deleted!' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
