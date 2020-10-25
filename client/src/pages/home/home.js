import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CurrentSlugContext from '../../context/currentSlugContext';
import axios from 'axios';

const Home = () => {
    const { setCurrentSlug } = useContext(CurrentSlugContext);

    const [latestArticles, setLatestArticles] = useState(null);

    useEffect(() => {
        setCurrentSlug(null);
    }, [setCurrentSlug]);

    useEffect(() => {
        axios.get('/api/articles/latest/details')
            .then(response => {
                console.log(response.data);
                setLatestArticles(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log('Status Code:', error.response.status, '| Details:', error.response.data);
                } else {
                    console.log(error);
                }
            });
    }, []);

    return (
        <div>
            <div className="row mb-4">
                <div className="col-6">
                    <h1 className="m-0">IMCoding</h1>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-end wda">
                    {'// web.dev.articles'}
                </div>

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
                                Server side code interests me the most... interacting with databases (SQL as well as MongoDB), writing resolver functions, RESTful APIs, integration testing and validation.
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
                        {latestArticles &&
                            <Fragment>
                                {latestArticles.map(article => (
                                    <div key={article.slug} className="p-2">
                                        <Link to={'/article/' + article.slug}><span className="bigger font-weight-bolder">{article.slug}</span></Link> <span className="ml-2 small text-muted">(created on: {article.createdAt})</span>
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

            <div className="border-top pt-5 text-center">
                <a href="mailto:connect@imcoding.mikegullo.com"><img src="/images/email.png" alt="Email me" className="mr-2" /><span className="font-weight-bolder">Contact me</span></a> if you have any questions, comments or info on how to improve any of the code in these article. Let me know how you do it!
            </div>
        </div>
    );
};

export default Home;
