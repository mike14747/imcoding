import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Loading from '../../components/loading/loading';

const Article = () => {
    const { articleid } = useParams();

    const [article, setArticle] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get('/api/articles/' + articleid)
            .then(response => {
                response.data[0] ? setArticle(response.data[0]) : setArticle(null);
            })
            .catch(error => {
                console.log(error);
                setArticle(null);
            })
            .finally(() => setIsLoaded(true));
    }, [articleid]);

    if (isLoaded && !article) {
        return <Redirect to="/article" />;
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
                        <ReactMarkdown source={article.markdown} />
                    </div>
                </Fragment>
            }
        </div>
    );
};

export default Article;
