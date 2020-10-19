import React from 'react';
import { Link } from 'react-router-dom';
import AddButton from './subcomponents/addButton/addButton';
import Dropdown from './subcomponents/dropdown/dropdown';
import Auth from './subcomponents/auth/auth';

const Header = () => {
    return (
        <div className="container-fluid bg-lt-brown header">
            <div className="row flex-row">
                <div className="col-md-3 col-6 order-md-1 d-flex justify-content-start align-items-center border-bottom border-secondary py-2">
                    <h1><Link to="/" className="text-decoration-none">IMCoding</Link></h1>
                </div>
                <div className="col-md-3 col-6 order-md-4 flex-column d-flex justify-content-center align-items-end border-bottom border-secondary py-2">
                    <Auth />
                </div>
                <div className="col-md-3 col-6 order-md-2 d-flex justify-content-center align-items-center border-bottom border-secondary py-2 header-bottom">
                    <AddButton />
                </div>
                <div className="col-md-3 col-6 order-md-3 d-flex justify-content-center align-items-center border-bottom border-secondary py-2 header-bottom">
                    <Dropdown />
                </div>
            </div>
        </div>
    );
};

export default Header;
