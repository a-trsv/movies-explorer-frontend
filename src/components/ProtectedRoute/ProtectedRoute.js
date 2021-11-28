import React from 'react'
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component, redirectAddress, ...props }) => {
    return (
        <Route>
            {
                () => props.loggedIn ? <Component {...props} /> : <Redirect to={redirectAddress} />
            }
        </Route>
    )
}

export default ProtectedRoute