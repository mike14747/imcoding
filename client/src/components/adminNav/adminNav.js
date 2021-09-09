import React, { useContext, Fragment } from 'react';
import UserContext from '../../context/userContext';

import AddButton from './subcomponents/addButton/addButton';
import Auth from './subcomponents/auth/auth';
import './css/adminNav.css';

const AdminNav = () => {
    const { user } = useContext(UserContext);

    return (
        <Fragment>
            {user &&
                <nav aria-label="Admin Navigation" className="admin-nav">
                    <div className="nav-add">
                        <AddButton />
                    </div>
                    <div className="nav-auth">
                        <Auth />
                    </div>
                </nav>
            }
        </Fragment>

    );
};

export default AdminNav;
