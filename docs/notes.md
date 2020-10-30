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
