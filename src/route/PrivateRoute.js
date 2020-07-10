// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import {useAuth} from '../context/AuthContext'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const {isAuthenticated} =  useAuth() //AuthService.isLoggedIn()

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (

            // TODO : CHECK PATH 
          <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute