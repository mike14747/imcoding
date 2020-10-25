import React, { useState, useContext, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ListChangedContext from '../../context/listChangedContext';
import CurrentSlugContext from '../../context/currentSlugContext';

const NewArticle = () => {
    const { setHasChanged } = useContext(ListChangedContext);

    const [article, setArticle] = useState({
        title: '',
        description: '',
        markdown: '',
    });

    const { setCurrentSlug } = useContext(CurrentSlugContext);

    useEffect(() => {
        setCurrentSlug(null);
    }, [setCurrentSlug]);

    const [newSlug, setNewSlug] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setArticle({
            ...article,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/articles', {
            title: article.title,
            description: article.description,
            markdown: article.markdown,
        })
            .then((response) => {
                setMessage(null);
                setHasChanged(true);
                setNewSlug(response.data.slug);
            })
            .catch(error => {
                if (error.response) {
                    setMessage(error.response.data);
                    console.log('Status Code:', error.response.status, '| Details:', error.response.data);
                } else {
                    setMessage('An error occurred. Please try your request again.');
                    console.log(error);
                }
            });
    };

    if (newSlug) {
        return <Redirect to={'/article/' + newSlug} />;
    }

    return (
        <Fragment>
            <h2>Add a new article</h2>
            {message &&
                <p className="text-danger">{message}</p>
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
    );
};

export default NewArticle;
