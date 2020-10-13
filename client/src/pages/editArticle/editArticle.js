import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';

const EditArticle = () => {
    const { slug } = useParams();

    const [article, setArticle] = useState({
        title: '',
        description: '',
        markdown: '',
        createdAt: '',
        slug: '',
    });

    const [isUpdated, setIsUpdated] = useState(false);
    const [doesArticleExist, setDoesArticleExist] = useState(true);

    useEffect(() => {
        axios.get('/api/articles/' + slug)
            .then(response => {
                response.data[0] ? setArticle(response.data[0]) : setDoesArticleExist(false);
            })
            .catch(error => console.log(error));
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
            title: article.title,
            description: article.description,
            markdown: article.markdown,
            slug: article.slug,
        })
            .then(() => {
                setIsUpdated(true);
            })
            .catch(error => console.log(error));
    };

    if (isUpdated) {
        return <Redirect to={'/article/' + slug} />;
    }

    if (!doesArticleExist) {
        return <Redirect to="/no-match" />;
    }

    return (
        <Fragment>
            <h2>Edit an article</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title">Title</label>
                    <input className="w-100 mw-100" type="text" name="title" id="title" value={article.title} onChange={handleChange}></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" defaultValue={article.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="markdown">Markdown</label>
                    <textarea className="markdown" name="markdown" id="markdown" defaultValue={article.markdown} onChange={handleChange}></textarea>
                </div>
                <div className="mb-4">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Fragment>
    );
};

export default EditArticle;
