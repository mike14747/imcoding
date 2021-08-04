import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './subcomponents/dropdown/dropdown';
import './css/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                        <img src="images/imcoding_logo.png" alt="Home" className="logo" />
                    </Link>
                </div>
                <div className="header-right">
                    <Dropdown />
                </div>
            </div>
        </header>
    );
};

export default Header;
