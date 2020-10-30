### How to avoid errors in the markdown rendering

1. **Don't** have any empty code blocks or the page will not render and you'll get "str is not defined" errors.

    - For now, the temporary fix for stopping errors if there is an empty code block is to edit **/client/node_modules/react-syntax-highlighter/dist/esm/highlight.js** in the following way:

```js
// change this line
var value = node.children[0].value;

// to
var value = node.children[0].value || '';
```

---
