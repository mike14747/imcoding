### Testing

1. login with the user in the .env file
2. test all the routes
    - public and private... GET, POST, PUT and DELETE
    - add a user and an article
3. logout the user
4. re-test all the routes (public and private... GET, POST, PUT and DELETE)
    - this time the private routes/methods should return status 401
    - the public routes/methods should pass and return the just created items
5. run cleanup
    - log back in
    - delete the user and article that were just created
    - logout the user
    - disconnect the agent

---
