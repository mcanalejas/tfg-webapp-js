import React from 'react'
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../context/UserContext';

function RouteAlumno({ component: Component, ...rest }) {
    const { user } = useContext(UserContext)
    return (
        <Route
            {...rest}
            component={
                props => (
                    user.isAlumno
                        ? <Component {...props} />
                        : <Redirect to={'/login'} />
                )
            }
        />
    )
}

export default RouteAlumno