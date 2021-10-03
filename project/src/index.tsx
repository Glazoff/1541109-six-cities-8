import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  OFFER_COUNT: 212,
};

ReactDOM.render(
  <React.StrictMode>
    <App offerCount = {Setting.OFFER_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
