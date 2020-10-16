import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from 'axios';
import Dropdown from '../dropdown/dropdown';

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
                <div className="col-3 d-flex justify-content-start align-items-center">
                    <h1><Link to="/">IMCoding</Link></h1>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                    {user &&
                        <Link to="/new">Add Article</Link>
                    }
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <Dropdown />
                </div>
                <div className="col-3 d-flex flex-column justify-content-center align-items-end">
                    {user
                        ? <Fragment>
                            <div className="my-2">
                                Logged in as: {user.username}
                            </div>
                            <div className="my-2">
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
