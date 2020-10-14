import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// the user object is passed in as a prop-types
// the component to be rendered is also passed in as a prop and is destructured under the alias "Component", because it'll be the rendered component
// if the user object is populated, proceed to the appropriate route's component
// if the user object is null, the user is redirected to the login route
// in many cases, there won't be any extra props, so "...rest" would be redundant in those cases
const ProtectedRoute = ({ user, component: Component, ...rest }) => {
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
