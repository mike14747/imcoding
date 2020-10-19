import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../../context/userContext';
import './css/addButton.css';

const AddButton = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            {user &&
                <Link to="/new"><button className="add-btn">Add Article</button></Link>
            }
        </div>
    );
};

export default AddButton;
