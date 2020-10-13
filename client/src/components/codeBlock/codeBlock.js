import React from 'react';
import PropTypes from 'prop-types';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs';

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
    backgroundColor: '#eeeeee',
    fontSize: '1rem',
    margin: '0rem 1rem 1rem 1rem',
    padding: '0.5rem',
};

const CodeBlock = ({ language, value }) => {
    if (!language) language = 'text';
    return (
        <SyntaxHighlighter language={language} style={vs} customStyle={markdownCSS}>
            {value}
        </SyntaxHighlighter>
    );
};

CodeBlock.propTypes = {
    language: PropTypes.string,
    value: PropTypes.string,
};

export default CodeBlock;
