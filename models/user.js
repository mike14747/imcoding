const db = require('../config/connectionPool').getDb();
const ObjectID = require('mongodb').ObjectID;

const User = {
    getAllUsers: async () => {
        try {
            const result = await db.collection('users').find({}).sort({ _id: -1 }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserById: async (_id) => {
        try {
            const result = await db.collection('users').find({ _id: ObjectID(_id) }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserByIdForPassport: async (_id) => {
        try {
            const result = await db.collection('users').find({ _id: ObjectID(_id) }).project({ email: 0, name: 0, payees: 0 }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserByUsername: async (username) => {
        try {
            const result = await db.collection('users').find({ username: username }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewUser: async (paramsObj) => {
        try {
            const document = {
                username: paramsObj.username,
                password: paramsObj.password,
            };
            const result = await db.collection('users').insertOne(document);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateUserById: async (paramsObj) => {
        try {
            const queryParams = {
                _id: paramsObj._id,
            };
            const document = {
                username: paramsObj.username,
                password: paramsObj.password,
            };
            const result = await db.collection('users').updateOne({ _id: ObjectID(queryParams._id) }, { $set: document });
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteUserById: async (_id) => {
        try {
            const result = await db.collection('users').deleteOne({ _id: ObjectID(_id) });
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = User;
