import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Loading from '../../components/loading/loading';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Article = () => {
    const { slug } = useParams();

    const [article, setArticle] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get('/api/articles/' + slug)
            .then(response => {
                response.data[0] ? setArticle(response.data[0]) : setArticle(null);
            })
            .catch(error => {
                console.log(error);
                setArticle(null);
            })
            .finally(() => setIsLoaded(true));
    }, [slug]);

    if (isLoaded && !article) {
        return <Redirect to="/article" />;
    }

    function CodeBlock({ language, value }) {
        if (!language) language = 'text';
        console.log('language:', language);
        return (
            <SyntaxHighlighter language={language} style={vs} customStyle={{ backgroundColor: '#eeeeee', fontSize: '1rem' }}>
                {value}
            </SyntaxHighlighter>
        );
    }

    return (
        <div>
            {!isLoaded
                ? <Loading />
                : <Fragment>
                    <div className="border-bottom mb-4">
                        <h1 className="mt-3 mb-1">
                            {article.title}
                        </h1>
                        <div className="small mb-2">
                            Created on: {article.createdAt}
                        </div>
                        <div className="row mb-2">
                            <div className="col-6">
                                <h5>
                                    {article.description}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* <ReactMarkdown source={article.markdown} /> */}
                        <ReactMarkdown
                            source={article.markdown}
                            renderers={{ code: CodeBlock }}
                        />
                    </div>
                </Fragment>
            }
        </div>
    );
};

export default Article;
