import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './css/addButton.css';

const AddButton = () => {
    return (
        <Fragment>
            <Link to="/new"><button className="add-btn">Add Article</button></Link>
        </Fragment>
    );
};

export default AddButton;
