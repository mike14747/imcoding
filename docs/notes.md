### How to avoid errors in the markdown rendering

1. **Don't** have any empty code blocks or the page will not render and you'll get "str is not defined" errors.

    - This was fixed by adding a check for an empty value in **/client/src/components/codeBlock/codeBlock.js**

```js
const CodeBlock = ({ language, value }) => {
    if (!language) language = 'text';
    if (!value) value = ''; // this line was added
    return (
        <SyntaxHighlighter language={language} style={vs} customStyle={markdownCSS}>
            {value}
        </SyntaxHighlighter>
    );
};
```

---

### HTTP Caching

Added this to _.htaccess_ at imcoding@mikegullo.com:

```bash
## EXPIRES CACHING ##
ExpiresActive On
ExpiresByType image/jpg "access plus 1 month"
ExpiresByType image/jpeg "access plus 1 month"
ExpiresByType image/gif "access plus 1 month"
ExpiresByType image/png "access plus 1 month"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/pdf "access plus 1 month"
ExpiresByType text/x-javascript "access plus 1 month"
ExpiresByType application/x-shockwave-flash "access plus 1 month"
ExpiresByType image/x-icon "access plus 1 month"
ExpiresDefault "access plus 2 days"
## EXPIRES CACHING ##

```

---

### Connection Pool

The connection pool will connect to the local mongo database if **process.env.NODE_ENV** _does not equal_ **production**.

This way the integration tests are always run on the local database.

---

### Still needs work

-   the Delete Article confirmation text needs to go above the button

---

### react-markdown breaking changes

As of v6 react-markdown has changed the property names of its renderer from _source_ to _children_ and _renderers_ to _components_.

```js
<ReactMarkdown source={article.markdown} renderers={{ code: CodeBlock }} />
```

```js
<ReactMarkdown children={article.markdown} components={{ code: CodeBlock }} />
```

---

### react-syntax-highlighter breaking changes

```js
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tomorrow from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';
import {
    jsx,
    javascript,
    json,
    css,
    bash,
    sql,
    markup,
    ignore,
} from 'react-syntax-highlighter/dist/esm/languages/prism';
```

needs to be changed to:

```js
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tomorrow from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import ignore from 'react-syntax-highlighter/dist/esm/languages/prism/ignore';
```

---
