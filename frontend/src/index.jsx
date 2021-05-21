import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import store from './Redux/Index';
import history from './history';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const root = document.getElementById('root');
axios.defaults.baseURL = 'https://notatky.herokuapp.com';
// axios.defaults.headers.common['Access-Control-Request-Headers'] =
// ['Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type'];
// axios.defaults.headers.common['Access-Control-Request-Method'] = ['GET,HEAD,OPTIONS,POST,PUT'];
// axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  root
);
