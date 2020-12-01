import React from 'react'
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../context/UserContext'

function RouteAdmin({ component: Component, ...rest }) {
    const { user } = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={
                props => (
                    user.isAdmin
                        ? <Component {...props} />
                        : <Redirect to={'/403'} />
                )
            }
        />
    )
}

export default RouteAdmin