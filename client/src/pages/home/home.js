import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import UserContext from '../../context/userContext';

const Home = () => {
    const { user } = useContext(UserContext);

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
            {user &&
                <p><Link to="/new">Add Article</Link></p>
            }
        </div>
    );
};

export default Home;
