import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Loading from '../../components/loading/loading';
import CodeBlock from '../../components/codeBlock/codeBlock';
import UserContext from '../../context/userContext';
import ListChangedContext from '../../context/listChangedContext';
import CurrentSlugContext from '../../context/currentSlugContext';
import './css/markdown_styles.css';

const Article = () => {
    const { slug } = useParams();
    const { user } = useContext(UserContext);
    const { setHasChanged } = useContext(ListChangedContext);

    const [article, setArticle] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteButtonCounter, setDeleteButtonCounter] = useState(0);

    const { setCurrentSlug } = useContext(CurrentSlugContext);

    useEffect(() => {
        axios.get('/api/articles/' + slug)
            .then(response => {
                if (response.data[0]) {
                    setArticle(response.data[0]);
                    setCurrentSlug(slug);
                } else {
                    setArticle(null);
                    setCurrentSlug(null);
                }
            })
            .catch(error => {
                console.log(error.message);
                setArticle(null);
                setCurrentSlug(null);
            })
            .finally(() => {
                setDeleteButtonCounter(0);
                setIsDeleted(false);
                setIsLoaded(true);
            });
    }, [slug, setCurrentSlug]);

    const onDelete = () => {
        if (deleteButtonCounter === 0) {
            setDeleteButtonCounter(1);
        } else {
            axios.delete('/api/articles/' + article._id)
                .then(() => {
                    setHasChanged(true);
                    setIsDeleted(true);
                    setDeleteButtonCounter(0);
                    setCurrentSlug(null);
                })
                .catch(error => console.log(error.message));
        }
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
                : <article className="article">
                    <h2 className="heading border-bottom">
                        {article.title}
                    </h2>
                    <div className="small mb-2">
                        <span>Created: {article.createdAt}</span>
                        {article.updatedAt &&
                            <span className="ml-4 font-italic">Updated: {article.updatedAt}</span>
                        }
                    </div>
                    <div className="mb-4">
                        {article.description && article.description}
                    </div>
                    {user &&
                        <div className="mb-4">
                            <div className="text-right">
                                <Link to={'/edit/' + slug}><button>Edit this article</button></Link>
                                <button onClick={onDelete} className="ml-4">Delete this article</button>
                            </div>
                            {deleteButtonCounter === 1 &&
                                <div className="text-danger text-right">Are you sure?</div>
                            }
                        </div>
                    }
                    <div className="border-top pt-4">
                        <ReactMarkdown
                            source={article.markdown}
                            renderers={{ code: CodeBlock }}
                        />
                    </div>
                </article>
            }
        </Fragment >
    );
};

export default Article;
