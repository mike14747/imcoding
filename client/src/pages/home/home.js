import React from 'react';
import slugify from 'slugify';

const Home = () => {
    const string = 'This is the string... which has special characters: #%&';
    const slug = slugify(string, {
        lower: true,
        strict: true,
    });
    return (
        <div>
            <h1>This is the homepage!</h1>
            <p>This is a test for slugify.</p>
            <p>The string in question is: {string}</p>
            <p>Slugified version: {slug}</p>
        </div>
    );
};

export default Home;
