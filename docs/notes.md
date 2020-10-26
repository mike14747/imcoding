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

### How to avoid errors in the markdown rendering

1. **Don't** have any empty code blocks or the page will not render and you'll get "str is not defined" errors.

---

### Fix for react router issue

Add this to **.htaccess**:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

heroku logs --tail

---

