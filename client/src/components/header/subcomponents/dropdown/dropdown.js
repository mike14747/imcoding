import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListChangedContext from '../../../../context/listChangedContext';
import './css/dropdown.css';

const Dropdown = () => {
    const { hasChanged, setHasChanged } = useContext(ListChangedContext);

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
        <div className="d-flex justify-content-center align-items-center py-2">
            {articles && articles.length > 0 &&
                <div className="navdropdown">
                    <div className="navdropbtn">Select an article <i className="down"></i></div>
                    <div className="navdropdown-content">
                        {articles.map(article => (
                            <div className="item" key={article._id}>
                                <Link to={'/article/' + article.slug}>{article.title} </ Link>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Dropdown;
