import React from 'react';
import { Link } from 'react-router-dom';
import AddButton from './subcomponents/addButton/addButton';
import Dropdown from './subcomponents/dropdown/dropdown';
import Auth from './subcomponents/auth/auth';

const Header = () => {
    return (
        <div className="container-fluid header">
            <div className="row flex-row">
                <div className="col-md-3 col-6 order-md-1 d-flex align-items-center border-bottom border-secondary py-2 logo-div">
                    <Link to="/"><img src="/images/logo.png" alt="IMCoding" className="img-fluid" /></Link>
                </div>
                <div className="col-md-3 col-6 order-md-4 d-flex align-items-center border-bottom border-secondary py-2">
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
