import React, { useContext } from 'react';
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
        <div className="auth-divs">
            <div className="auth-divs">
                <span className="small text-secondary">user: </span>{user.username}
            </div>
            <div className="auth-divs">
                <button className="auth-btn logout-btn" onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
};

export default Auth;
