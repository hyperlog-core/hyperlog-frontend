import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { isUserAuthenticated } from '../utils/auth'

const PrivateRoute = (props) => (
    <Fragment>
        { isUserAuthenticated() ? props.children : <Redirect to="/login" /> }
    </Fragment>
)

export default PrivateRoute;
