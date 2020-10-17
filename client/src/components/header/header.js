import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from 'axios';
import Dropdown from './subcomponents/dropdown/dropdown';

const Header = () => {
    const { user, setUser } = useContext(UserContext);

    const handleClick = () => {
        axios.get('/api/auth/logout')
            .then(() => setUser(null))
            .catch(error => console.log(error));
    };

    return (
        <div className="container-fluid bg-lt-brown header">
            <div className="row flex-row">
                <div className="col-md-3 col-6 order-md-1 d-flex justify-content-start align-items-center border-bottom border-secondary py-2">
                    <h1><Link to="/">IMCoding</Link></h1>
                </div>
                <div className="col-md-3 col-6 order-md-4 flex-column d-flex justify-content-center align-items-end border-bottom border-secondary py-2">
                    {user
                        ? <Fragment>
                            <div className="my-1">
                                <span className="small text-secondary">user: </span>{user.username}
                            </div>
                            <div className="my-1">
                                <button onClick={handleClick}>Logout</button>
                            </div>
                        </Fragment>
                        : <Link to="/login">Login</Link>
                    }
                </div>
                <div className="col-md-3 col-6 order-md-2 d-flex justify-content-center align-items-center border-bottom border-secondary py-2 header-bottom">
                    {user &&
                        <Link to="/new">Add Article</Link>
                    }
                </div>
                <div className="col-md-3 col-6 order-md-3 d-flex justify-content-center align-items-center border-bottom border-secondary py-2 header-bottom">
                    <Dropdown />
                </div>
            </div>
        </div>
    );
};

export default Header;
