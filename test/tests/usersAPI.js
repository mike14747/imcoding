const agent = require('../utils/serverInit');
const { loginUser } = require('./loginUser');

// should POST a new user using the provided params body and return the insertedId


// should POST a second new user using the provided params body and return a second insertedId


// should GET the newly created user by _id


// should GET all users minus their passwords


// should GET a status 200 and an empty array because the _id should not match any articles


// should FAIL to POST a new article because the username is not unique


// should FAIL to POST a new user because the username is invalid


// should FAIL to POST a new user because the password is invalid


// should update, via PUT, the newly created user with these new parameters


// should FAIL to update, via PUT, the newly created user because that user isn't signed in


// should FAIL to update, via PUT the newly created user and return an error because _id does not exist


// should FAIL to update, via PUT the newly created user and return an error because _id is invalid


// should FAIL to update, via PUT the newly created user and return an error because username is invalid


// should FAIL to update, via PUT the newly created user and return an error because password is invalid


