import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './subcomponents/dropdown/dropdown';
import './css/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo-container">
                    <Link to="/">
                        <img src="/images/imcoding_logo4.png" alt="ImCoding" className="logo" />
                    </Link>
                </div>

                <div className="heading-container">
                    <h1 className="heading">
                        ImCoding
                    </h1>
                    <p className="slogan">
                        WebDev Articles
                    </p>
                </div>
            </div>
            <div className="header-right">
                <Dropdown />
            </div>
        </header>
    );
};

export default Header;
