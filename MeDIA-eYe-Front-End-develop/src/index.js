import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';
import UserProvider from './context/UserContext';
import MintFromCollectionProvider from './context/MintFromCollectionContext';
import { stopReportingRuntimeErrors } from 'react-error-overlay';
import ListenerProvider from './context/ListenerContext';
require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
  stopReportingRuntimeErrors(); // disables error overlays
}

ReactDOM.render(
  <MoralisProvider
    appId={process.env.REACT_APP_MORALIS_APP_ID}
    serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
  >
    <Provider store={store}>
      <UserProvider>
        <MintFromCollectionProvider>
          <App />
        </MintFromCollectionProvider>
      </UserProvider>
    </Provider>
  </MoralisProvider>,
  document.getElementById('MeDIAeYeNftPortal')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
