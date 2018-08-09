import React, { Component } from 'react';
import App from './App';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';

import { Authenticator } from 'aws-amplify-react';

import { Jumbotron, Container } from 'reactstrap';

class AuthExample extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    logedIn: null,
  };

  handleAuthStateChange = state => {
    this.setState({ logedIn: state === 'signedIn' ? true : false });
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/login"
            render={() => <Login handleAuthStateChange={this.handleAuthStateChange} logedIn={this.state.logedIn} />}
          />
          <PrivateRoute
            exact
            path="/videos"
            component={App}
            auth={this.state.logedIn}
            handleAuthStateChange={this.handleAuthStateChange}
          />
          <Redirect to="/videos" />
        </Switch>
      </Router>
    );
  }
}

export default AuthExample;
