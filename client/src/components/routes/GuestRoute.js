import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ component: Component, ...rest }) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  return (
    <Route {...rest} render={
      props => {
        if (!loggedUser) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default GuestRoute;