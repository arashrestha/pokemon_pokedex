import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Routes from './routes'
import './style.css'
import Store from './Store/Store';
import UiStore from './Store/UiStore'

let store = new Store();
let uiStore = new UiStore();

ReactDOM.render(
  <Provider
    store={store}
    uiStore={uiStore}
  >
    <Routes />

  </Provider>
  , document.getElementById('root')
);