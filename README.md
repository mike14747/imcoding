# imcoding

### What does this project do?

-   It's a place to show my notes and personal cheatsheets for all topics 'WebDev' and sort of a coding blog merged into one.
-   The articles are written in markdown and stored in a remote MongoDB database via Atlas.
-   There is an authentication system setup so you can add, edit and delete content if you are logged in.

---

### How you can use this project?

-   Clone the GitHub repo.
-   Install the necessary npm packages.

```bash
npm i
```

-   Include these environmental variable in your .env file:

```txt
MONGODB_URI_LOCAL=mongodb://localhost:27017/
MONGODB_DB_LOCAL=local_db_name
MONGODB_URI=MONGODB_URI=remote_mongodb
MONGODB_DB=db_name
# ----------
NODE_ENV=dev
ES_KEY=cookie_name
SESSION_SECRET=your_session_secret
HASHED_PASSWORD=your_hashed_password
REACT_APP_EMAIL=your@email.com
```

-   Start the app.

```bash
npm run start
```

---

![GitHub last commit](https://img.shields.io/github/last-commit/mike14747/imcoding?style=for-the-badge)

### This project was created and is maintained by:

-   Mike Gullo
-   Live version: [imcoding.herokuapp.com](https://imcoding.herokuapp.com/)
-   This project's github repo: https://github.com/mike14747/imcoding
-   Me on github: https://github.com/mike14747
-   Contact me at: mgullo.dev@gmail.com
