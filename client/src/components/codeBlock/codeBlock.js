import React from 'react';
import PropTypes from 'prop-types';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs';
import { jsx, javascript, json, css, bash, sql, markup, ignore } from 'react-syntax-highlighter/dist/esm/languages/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('ignore', ignore);

const markdownCSS = {
    backgroundColor: '#fcfcfc',
    fontSize: '1rem',
    margin: '0rem 1rem 1rem 1rem',
    padding: '0.5rem',
};

const lineNumberCSS = {
    color: '#666666', // this doesn't seem to work so for now I've turned off showLineNumbers
    paddingRight: '1.25rem',
    textAlign: 'left',
};

vs.url = vs.symbol = vs.number = vs.boolean = vs.variable = vs.constant = vs.inserted = vs['class-name'] = vs['language-json'] = vs['token.property'] = vs['line-numbers-rows > span:before'] = {
    color: '#298180',
};

const CodeBlock = ({ language, value }) => {
    if (!language) language = 'text';
    if (!value) value = '';
    return (
        <SyntaxHighlighter
            language={language}
            style={vs}
            customStyle={markdownCSS}
            wrapLongLines={false}
            showLineNumbers={false}
            lineNumberStyle={lineNumberCSS}
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
