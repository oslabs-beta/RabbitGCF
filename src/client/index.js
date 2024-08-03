import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  
)