# <img src="client/public/images/imcoding_logo4.png" width="30" height="30" alt="ImCoding" title="ImCoding" /> ImCoding

![ImCoding](https://img.shields.io/badge/ImCoding-228b22.svg?style=flat-square "ImCoding")
![by: Mike Gullo](https://img.shields.io/badge/by:-Mike%20Gullo-232323.svg?style=flat-square&labelColor=dc143c "by: Mike Gullo")

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB "React")
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=ffffff "MongoDB")
![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=ffffff "Markdown")
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000000 "JavaScript")
![Passport](https://img.shields.io/badge/Passport-000000?style=flat-square&logo=passport&logoColor=34E27A "Passport")
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat-square&logo=mocha&logoColor=ffffff "Mocha")
![Chai](https://img.shields.io/badge/Chai-A30701?style=flat-square&logo=chai&logoColor=ffffff "Chai")
![Heroku](https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=heroku&logoColor=ffffff "Heroku")

---

### What does this project do?

-   It's a place to share some of my notes and personal cheatsheets for all topics 'WebDev'... and sort of a coding blog merged into one.
-   The articles are written in markdown and stored in a remote MongoDB database via Atlas.
-   There is an authentication system setup so you can add, edit and delete content if you are logged in.

---

### How you can use this project?

-   Clone the GitHub repo.
-   Install the necessary npm packages.

```bash
npm i
```

-   Include these environmental variables in your .env file:

```txt
MONGODB_URI_LOCAL=mongodb://localhost:27017/
MONGODB_DB_LOCAL=local_db_name
MONGODB_URI=MONGODB_URI=remote_mongodb
MONGODB_DB=db_name
# ----------
NODE_ENV=dev
ES_KEY=cookie_name
SESSION_SECRET=your_session_secret
REACT_APP_EMAIL=your@email.com
```

-   Set up either a local or remote MongoDB database using the connection parameters in the above .env file.
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
