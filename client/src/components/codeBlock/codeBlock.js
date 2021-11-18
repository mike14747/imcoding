import React from 'react';
import PropTypes from 'prop-types';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tomorrow from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';
// import { jsx, javascript, json, css, bash, sql, markup, ignore } from 'react-syntax-highlighter/dist/esm/languages/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import ignore from 'react-syntax-highlighter/dist/esm/languages/prism/ignore';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('ignore', ignore);

const markdownCSS = {
    fontSize: 'clamp(0.9rem, 0.55vw + 0.6rem, 1rem)',
    margin: '1rem 1rem 2rem 1rem',
    padding: '1rem',
    maxWidth: '120ch',
    overflowX: 'auto',
    boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, 0.5)',
};

const CodeBlock = ({ language, value }) => {
    if (!language) language = 'text';
    if (!value) value = '';
    return (
        <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={markdownCSS}
            wrapLongLines={false}
            showLineNumbers={false}
            // spread props
            // PreTag={'pre tabindex="0"'}
        >
            {value}
        </SyntaxHighlighter>
    );
};

CodeBlock.propTypes = {
    language: PropTypes.string,
    value: PropTypes.string,
};

export default CodeBlock;
