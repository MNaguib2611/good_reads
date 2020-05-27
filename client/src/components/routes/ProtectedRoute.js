import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  return (
    <Route {...rest} render={
      props => {
           
        if (loggedUser) {
          // if(loggedUser.isAdmin){     //make sure admin will not visit users pages
          //   return <Redirect to={
          //   {
          //     pathname: '/admin',
          //     state: {
          //       from: props.location
          //     }
          //   }
          // } />
          // }
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/unauthorized',
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

export default ProtectedRoute;