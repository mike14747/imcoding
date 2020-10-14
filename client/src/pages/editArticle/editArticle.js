import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';
import Loading from '../../components/loading/loading';

const EditArticle = () => {
    const { slug } = useParams();

    const [article, setArticle] = useState({
        _id: '',
        title: '',
        description: '',
        markdown: '',
        slug: '',
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [doesArticleExist, setDoesArticleExist] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [newSlug, setNewSlug] = useState(null);

    useEffect(() => {
        axios.get('/api/articles/' + slug)
            .then(response => {
                response.data[0] ? setArticle(response.data[0]) : setDoesArticleExist(false);
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoaded(true));
    }, [slug]);

    const handleChange = e => {
        const { name, value } = e.target;
        setArticle({
            ...article,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/articles', {
            _id: article._id,
            title: article.title,
            description: article.description,
            markdown: article.markdown,
            slug: article.slug,
        })
            .then((response) => {
                setErrorMsg(null);
                setNewSlug(response.data.slug);
                setIsUpdated(true);
            })
            .catch(error => {
                setErrorMsg(error.response.data);
            });
    };

    if (isUpdated && newSlug) {
        return <Redirect to={'/article/' + newSlug} />;
    }

    if (isLoaded && !doesArticleExist) {
        return <Redirect to="/edit" />;
    }

    return (
        <Fragment>
            <h2>Edit an article</h2>
            {!isLoaded
                ? <Loading />
                : <Fragment>
                    {errorMsg &&
                        <h4 className="text-danger">{errorMsg}</h4>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title">Title</label>
                            <input className="w-100 mw-100" type="text" name="title" id="title" value={article.title} onChange={handleChange}></input>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" value={article.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="markdown">Markdown</label>
                            <textarea className="markdown" name="markdown" id="markdown" value={article.markdown} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-4">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </Fragment>
            }
        </Fragment>
    );
};

export default EditArticle;
