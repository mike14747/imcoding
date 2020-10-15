import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from 'axios';

const Header = () => {
    const { user, setUser } = useContext(UserContext);

    const handleClick = () => {
        axios.get('/api/auth/logout')
            .then(() => setUser(null))
            .catch(error => console.log(error));
    };

    return (
        <div className="container-fluid bg-lt-brown border-bottom border-dark mb-4">
            <div className="row">
                <div className="col-6">
                    <h1><Link to="/">IMCoding</Link></h1>
                </div>
                <div className="col-6 text-right">
                    {user
                        ? <Fragment>
                            <div>
                                Logged in as: {user.username}
                            </div>
                            <div>
                                <button onClick={handleClick}>Logout</button>
                            </div>
                        </Fragment>
                        : <Link to="/login">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
