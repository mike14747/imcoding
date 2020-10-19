import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
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
        <div>
            {user
                ? <Fragment>
                    <div className="auth-divs">
                        <span className="small text-secondary">user: </span>{user.username}
                    </div>
                    <div className="auth-divs">
                        <button className="auth-btn logout-btn" onClick={handleClick}>Logout</button>
                    </div>
                </Fragment>
                : <div className="auth-divs">
                    <Link to="/login"><button className="auth-btn login-btn">Login</button></Link>
                </div>
            }
        </div>
    );
};

export default Auth;
