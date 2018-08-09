import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';

export default function PrivateRoute({ component: Component, auth, handleAuthStateChange, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth === true ? (
          <Component {...props} handleAuthStateChange={handleAuthStateChange} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}
