import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './subcomponents/dropdown/dropdown';
import './css/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <h1><Link to="/"><span className="logo-text">{'<IMCoding />'}</span></Link></h1>
            </div>
            <nav className="header-right">
                <Dropdown />
            </nav>
        </header>
    );
};

export default Header;
