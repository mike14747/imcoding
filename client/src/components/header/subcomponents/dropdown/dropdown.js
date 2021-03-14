import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListChangedContext from '../../../../context/listChangedContext';
import CurrentSlugContext from '../../../../context/currentSlugContext';
import './css/dropdown.css';

const Dropdown = () => {
    const { hasChanged, setHasChanged } = useContext(ListChangedContext);
    const { currentSlug, setCurrentSlug } = useContext(CurrentSlugContext);

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        if (hasChanged) {
            axios.get('/api/articles')
                .then(response => {
                    setArticles(response.data);
                })
                .catch(error => {
                    console.log(error);
                    setArticles(null);
                })
                .finally(() => setHasChanged(false));
        }
    }, [hasChanged, setHasChanged]);

    return (
        <Fragment>
            {articles && articles.length > 0 &&
                <div className="navdropdown">
                    <div className="navdropbtn">Articles <i className="down"></i></div>
                    <div className="navdropdown-content">
                        {articles.map(article => (
                            <div className="item" key={article._id}>
                                {currentSlug && (article.slug === currentSlug)
                                    ? <Link to={'/article/' + article.slug} className="viewing"><span className="current-gt">&gt;</span>{article.title}</Link>
                                    : <Link to={'/article/' + article.slug} onClick={() => setCurrentSlug(article.slug)}>{article.title}</ Link>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }
        </Fragment>
    );
};

export default Dropdown;
