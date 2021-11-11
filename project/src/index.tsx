import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createAPI} from './services/api';

import App from './components/app/app';

import {reducer} from './store/reducer';

import {loadOffers} from './store/action';


const Setting = {
  OFFER_COUNT: 212,
};

const onUnauthorized = () => {
  // eslint-disable-next-line no-console
  console.log('Пользователь не авторизован');
}; // функция отрабатывает случай неавторизованного пользователя

export const API = createAPI(onUnauthorized);

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(API))));

store.dispatch(loadOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App
        offerCount = {Setting.OFFER_COUNT}
      />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root'));
