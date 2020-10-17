function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'User must be logged in to access this route!' });
        // return next();
    }
}

module.exports = checkAuthenticated;
