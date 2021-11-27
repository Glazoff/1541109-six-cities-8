import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, AnyAction} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createAPI} from './services/api';

import App from './components/app/app';

import {reducer} from './store/reducer';

import {getAuthFromServer, setAuth} from './store/action';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { State } from './types/state';
import { AxiosInstance } from 'axios';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const onUnauthorized = () => {
  store.dispatch(setAuth(false));
};

export const API = createAPI(onUnauthorized);

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(API))));


(store.dispatch as ThunkDispatch<State, AxiosInstance, AnyAction>)(getAuthFromServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store} >
        <ToastContainer/>
        <App/>
      </Provider>

    </React.StrictMode>,
    document.getElementById('root'));
}));
