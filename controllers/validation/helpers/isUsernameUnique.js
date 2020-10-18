const User = require('../../../models/user');

const isUsernameUnique = async (username) => {
    const [data, error] = await User.getUserByUsername(username);
    console.log(data);
    if (error) throw new Error(error);
    if (data && data.length > 0) throw new RangeError('Username "' + username + '" is already in use!');
};

module.exports = isUsernameUnique;
