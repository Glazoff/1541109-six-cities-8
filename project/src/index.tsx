import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import {offers, favoritesOffers} from './mocks/offers';

const Setting = {
  OFFER_COUNT: 212,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offerCount = {Setting.OFFER_COUNT}
      offers = {offers}
      favoritesOffers = {favoritesOffers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
