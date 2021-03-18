import React, { useContext, Fragment } from 'react';
import UserContext from '../../../../context/userContext';
import axios from 'axios';
import './css/auth.css';

const Auth = () => {
    const { user, setUser } = useContext(UserContext);

    const handleClick = () => {
        axios.get('/api/auth/logout')
            .then(() => setUser(null))
            .catch(error => console.log(error));
    };

    return (
        <Fragment>
            <button className="logout-btn" onClick={handleClick}><span className="logout">Logout:</span> {user.username}</button>
        </Fragment>
    );
};

export default Auth;
