import './scss/index.scss';

import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';
import '../node_modules/rapid7-icon-font/css/rapid7.css';
import configureStore from './store';
import { Provider } from 'react-redux'

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

const app = React.createElement(App, {}, '');

ReactDOM.render(
  <Provider store={configureStore}>
    {app}
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();