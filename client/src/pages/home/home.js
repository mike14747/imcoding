import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CurrentSlugContext from '../../context/currentSlugContext';
import axios from 'axios';
import Loading from '../../components/loading/loading';

const Home = () => {
    const { setCurrentSlug } = useContext(CurrentSlugContext);

    const [latestArticles, setLatestArticles] = useState(null);
    const [areLatestLoaded, setAreLatestLoaded] = useState(false);

    useEffect(() => {
        setCurrentSlug(null);
    }, [setCurrentSlug]);

    useEffect(() => {
        axios.get('/api/articles/latest/details')
            .then(response => {
                setLatestArticles(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log('Status Code:', error.response.status, '| Details:', error.response.data);
                } else {
                    console.log(error);
                }
            })
            .finally(() => setAreLatestLoaded(true));
    }, []);

    return (
        <Fragment>
            <div className=" text-right text-muted small mb-3">
                {'// web.dev.articles'}
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-5">
                    <div className="border">
                        <div className="card1-heading p-2">
                            <div className="row">
                                <div className="col-auto pr-0">
                                    <img src="/images/my_profile_pic.png" alt="Me" className="me-pic" />
                                </div>
                                <div className="col">
                                    <h4 className="m-0">About me</h4>
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <p>
                                <span className="about-text">I</span>&apos;m an avid programmer, who loves writing code. I thought I&apos;d share some of what I&apos;ve learned with others and hopefully learn more from the incoming feedback in the process.
                            </p>
                            <p>
                                Server side code interests me the most... interacting with databases (MySQL as well as MongoDB), writing resolver functions, RESTful APIs, integration testing and validation.
                            </p>
                            <p>
                                On the front end, it seems like every app I build these days always settles into me using React.
                            </p>
                            <p>
                                Though I continue in my career as an electronics technician, I hope to make the transition into programming in the near future.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="border">
                        <div className="card2-heading p-2">
                            <div className="row">
                                <div className="col-auto pr-0">
                                    <img src="/images/article_icon.png" alt="Articles" />
                                </div>
                                <div className="col">
                                    <h4 className="m-0">Latest Articles</h4>
                                </div>
                            </div>
                        </div>
                        {!areLatestLoaded
                            ? <Loading />
                            : latestArticles &&
                            <Fragment>
                                {latestArticles.map(article => (
                                    <div key={article.slug} className="p-2">
                                        <Link to={'/article/' + article.slug}><span className="bigger font-weight-bolder">{article.title}</span></Link> <span className="ml-2 small text-muted">(created on: {article.createdAt})</span>
                                        <div className="small">
                                            {article.description}
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        }
                        <div className="mt-4 p-2 small">
                            ...more coming on a regular basis
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
