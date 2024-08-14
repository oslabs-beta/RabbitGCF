import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='573946794354-1ci7423kfujd9nsitrscmf4m5be8085u.apps.googleusercontent.com'>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
  
)