import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CurrentSlugContext from '../../context/currentSlugContext';
import axios from 'axios';
import Loading from '../../components/loading/loading';

import './css/home.css';

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
            <article className="mb-4">
                <h2 className="main-heading">
                    What is ImCoding?
                </h2>
                <p className="description">
                    IMCoding is as much my own personal cheatsheet for all topics &apos;WebDev&apos; than it is an actual blog. I&apos;m posting articles with descriptions and a lot of sample code.
                </p>

                <div className="row mb-4">
                    <aside aria-label="About me" className="col-md-6 mb-5">
                        <div className="card">
                            <div className="card1-heading">
                                <div className="row">
                                    <div className="col-auto pr-0">
                                        <img src="/images/mike_profile_pic.jpg" alt="My profile pic" className="me-pic" />
                                    </div>
                                    <div className="col">
                                        <h3 className="card-heading">About me</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <p>
                                    <span className="indent">I</span>&apos;m an avid programmer, who loves writing code. I thought I&apos;d share some of what I&apos;ve learned with others and hopefully learn more from the incoming feedback in the process. Being a diligent note taker who likes to document things along the way has made that pretty easy to do.
                                </p>
                                <p>
                                    I'm equally happy working on the back-end or front-end. I love interacting with databases (MySQL as well as MongoDB), writing resolver functions, RESTful APIs, integration testing and validation. On the front end, it seems like every app I build these days always settles into me using React (or a React-based framework like Next.js).
                                </p>
                                <p>
                                    I&apos;m currently working as an electronics technician, but am seeking a full-time position as a web developer... <a href="https://www.mikegullo.com/" target="_blank" rel="noopener noreferrer">more about that</a>.
                                </p>
                            </div>
                        </div>
                    </aside>

                    <aside aria-label="Latest Articles" className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card2-heading">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="card-heading">Latest Articles</h3>
                                    </div>
                                    <div className="col-auto">
                                        <div className="article-icon">
                                            <p className="article-icon-h3">
                                                At varius vel pharetra vel turpis nunc eget.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                            <p className="article-icon-quote">
                                                Nunc sed velit dignissim sodales ut eu sem. Enim sed faucibus turpis in eu mi. Justo nec ultrices dui sapien eget mi proin sed libero.
                                            </p>
                                            <p>
                                                At in tellus integer feugiat scelerisque. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Lacinia at quis risus sed vulputate.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!areLatestLoaded
                                ? <Loading />
                                : latestArticles &&
                                <div className="p-2">
                                    {latestArticles.map(article => (
                                        <div key={article.slug} className="p-2">
                                            <Link to={'/article/' + article.slug}><span className="bigger font-weight-bolder">{article.title}</span></Link> <span className="ml-2 small text-muted">(created on: {article.createdAt})</span>
                                            <div className="small">
                                                {article.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }

                            <div className="mt-4 p-2 small">
                                ...more coming on a semi-regular basis
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
        </Fragment>
    );
};

export default Home;
