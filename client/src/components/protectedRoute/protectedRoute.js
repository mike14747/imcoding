import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ user, component: Component, ...rest }) => {
    console.log('inside protected route, user:', user);
    return (
        <Route
            {...rest}
            render={props => user
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login' }} />
            }
        />
    );
};

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    component: PropTypes.func,
};

export default ProtectedRoute;
