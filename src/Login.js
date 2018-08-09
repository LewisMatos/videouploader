import React, { Component } from 'react';
import { Authenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';

import { Jumbotron, Container } from 'reactstrap';

class Login extends Component {
  render() {
    return this.props.logedIn ? (
      <Redirect
        to={{
          pathname: '/videos',
          state: { from: this.props.location },
        }}
      />
    ) : (
      <div>
        <Jumbotron fluid className="main-header">
          <Container fluid>
            <h1 className="display-3 main-header-text">VidUp</h1>
            <h3 className="display-6 main-header-text mt-5">Simple Video Upload</h3>
          </Container>
        </Jumbotron>
        <Authenticator onStateChange={this.props.handleAuthStateChange} />
      </div>
    );
  }
}

export default Login;
