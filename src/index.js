import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./scss/bootstrap.scss"
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import store from "./store/store"
import { Provider } from 'react-redux';
import "./scss/checkbox.css"
library.add(fab, fas, far);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);