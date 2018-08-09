import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import Amplify from 'aws-amplify';
import configuration from './aws-exports';

Amplify.configure(configuration);

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
