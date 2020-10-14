const passport = require('passport');
const User = require('../models/user');

const LoginStrategy = require('./loginStrategy');
passport.use('login', LoginStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const [data, error] = await User.getUserByIdForPassport({ _id: _id });
        if (!data) return done(error);
        if (data.length === 1) {
            const user = { _id: data[0]._id, username: data[0].username };
            return done(null, user);
        } else {
            return done(null, false, { message: 'Could not find a valid user!' });
        }
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;
