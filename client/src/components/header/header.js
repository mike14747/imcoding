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
                        <div className="home">
                            <img src="images/home-icon.png" alt="Home" />
                        </div>
                    </Link>
                    <h1>{'<IMCoding />'}</h1>
                </div>
                <nav className="header-right">
                    <Dropdown />
                </nav>
            </div>
        </header>
    );
};

export default Header;
