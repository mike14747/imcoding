import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './subcomponents/dropdown/dropdown';
import './css/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <Link to="/"><h1>{'<IMCoding />'}</h1></Link>
                </div>
                <nav className="header-right">
                    <Dropdown />
                </nav>
            </div>
        </header>
    );
};

export default Header;
