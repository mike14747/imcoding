# <img src="client/public/images/imcoding_logo4.png" width="30" height="30" alt="ImCoding" title="ImCoding" /> ImCoding

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB 'React')
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=ffffff 'MongoDB')
![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=ffffff 'Markdown')
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000000 'JavaScript')
![Passport](https://img.shields.io/badge/Passport-000000?style=flat-square&logo=passport&logoColor=34E27A 'Passport')
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat-square&logo=mocha&logoColor=ffffff 'Mocha')
![Chai](https://img.shields.io/badge/Chai-A30701?style=flat-square&logo=chai&logoColor=ffffff 'Chai')
![Heroku](https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=heroku&logoColor=ffffff 'Heroku')

---

### What does this project do?

-   It's a place to share some of my notes and personal cheatsheets for all topics 'WebDev'... and sort of a coding blog merged into one.
-   The articles are written in markdown and stored in a remote MongoDB database via Atlas.
-   There is an authentication system setup so you can add, edit and delete content if you are logged in.

---

### About this project

ImCoding uses an Express server and RESTful api on the server-side, with a React front end.

The articles are written in Markdown; which is stored in a MongoDB database... hosted by Atlas.

I'm using the native MongoDB driver in node.

Joi input validation is used in the controllers for the input and editing of articles.

To render the Markdown in React, I'm using "_react-markdown_" and "_react-syntax-highlighter_".

This CodeBlock component is being used with react-syntax-highlighter and it is styled using "_css-in-js_"... which I'm not crazy about in general, but it worked fine in this use case.

```js
// codeBlock.js

// ,,,import and configure necessary items


const markdownCSS = {
    fontSize: 'clamp(0.9rem, 0.55vw + 0.6rem, 1rem)',
    margin: '1rem 1rem 2rem 1rem',
    padding: '1rem',
    maxWidth: '120ch',
    overflowX: 'auto',
    boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, 0.5)',
};

const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
        let match = /language-(\w+)/.exec(className || '');
        if (!match) match = ['language-txt', 'text']; // this is not a real or supported language, but it does make the text white in a code block
        return !inline && match ? (
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={tomorrow}
                customStyle={markdownCSS}
                language={match[1]}
                PreTag="div"
                {...props}
            />
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
};
```

The Markdown is rendered in the article page using the \<ReactMarkdown\> component (which includes the above CodeBlock component for syntax highlighting).

```jsx
<ReactMarkdown components={CodeBlock}>{article.markdown}</ReactMarkdown>
```

This project includes an authentication system using "_Passport_", plus a few other packages to maintain persistent user sessions.

The server uses the npm package, Helmet, to set Content Security Policy directives.

Normally, I would install "_react-scripts_" as a devDependency because v4 has security vulnerabilities. But, since this app is hosted on Heroku, it had to be installed as a regular dependency because Heroku uses it during the build process.

This project uses ESLint and has separate "_.eslintrc.json_" files for the server and the React front end.

There is extensive testing coverage for the api routes (59 tests), using _Mocha_, _Chai_ and _Chai-http_.

---

### How you can use this project?

-   Clone the GitHub repo.
-   Install the necessary npm packages.
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
npm run dev

# or to run just the Express server and not the front end
npm run start
```

---

![ImCoding](project_name.svg 'ImCoding')
![by Mike Gullo](author.svg 'by Mike Gullo')

-   Live version: [imcoding.herokuapp.com](https://imcoding.herokuapp.com/)
-   This project's github repo: https://github.com/mike14747/imcoding
-   Me on github: https://github.com/mike14747
-   Contact me at: mgullo.dev@gmail.com

![GitHub last commit](https://img.shields.io/github/last-commit/mike14747/imcoding?style=for-the-badge)
