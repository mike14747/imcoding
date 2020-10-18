When writing the tests, before looging in, check that all the routes and confirm functionality as far as having or not having the approprate access.

Then, log in and re-check the same thing.

Converting an objectId() into a string:

```js
getUserByIdForPassport: async (_id) => {
    try {
        const result = await db.collection('users').aggregate([
            {
                $match: { _id: ObjectID(_id) },
            },
            {
                $project: {
                    _id: {
                        $toString: '$_id',
                    },
                    username: 1,
                },
            },
        ]).toArray();
        return [result, null];
    } catch (error) {
        return [null, error];
    }
},

// vs the regular way of finding a user by id

getUserByIdForPassport: async (_id) => {
    try {
        const result = await db.collection('users').find({ _id: ObjectID(_id) }).toArray();
        return [result, null];
    } catch (error) {
        return [null, error];
    }
},
```
