import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Loading from '../../components/loading/loading';
import CodeBlock from '../../components/codeBlock/codeBlock';
import UserContext from '../../context/userContext';
import ListChangedContext from '../../context/listChangedContext';

const Article = () => {
    const { slug } = useParams();
    const { user } = useContext(UserContext);
    const { setHasChanged } = useContext(ListChangedContext);

    const [article, setArticle] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        axios.get('/api/articles/' + slug)
            .then(response => {
                response.data[0] ? setArticle(response.data[0]) : setArticle(null);
            })
            .catch(error => {
                console.log(error.message);
                setArticle(null);
            })
            .finally(() => setIsLoaded(true));
    }, [slug]);

    const onDelete = () => {
        axios.delete('/api/articles/' + article._id)
            .then(() => {
                setHasChanged(true);
                setIsDeleted(true);
            })
            .catch(error => console.log(error));
    };

    if (isDeleted) {
        return (
            <h4 className="m-5 text-center text-danger">The article was successfully deleted!</h4>
        );
    }

    if (isLoaded && !article) {
        return <Redirect to="/article" />;
    }

    return (
        <Fragment>
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
                            {user &&
                                <div className="col-6 text-right">
                                    <Link to={'/edit/' + slug} className="mr-4"><button>Edit this article</button></Link>
                                    <button onClick={onDelete}>Delete this article</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div>
                        <ReactMarkdown
                            source={article.markdown}
                            renderers={{ code: CodeBlock }}
                        />
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

export default Article;
