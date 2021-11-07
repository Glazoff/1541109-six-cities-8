import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {reducer} from './store/reducer';

import {favoritesOffers} from './mocks/offers';

const Setting = {
  OFFER_COUNT: 212,
};

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App
        offerCount = {Setting.OFFER_COUNT}
        favoritesOffers = {favoritesOffers}
      />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root'));
