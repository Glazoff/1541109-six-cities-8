/* eslint-disable no-console */
import {Offer, Offers, OffersForAdapterTypes} from '../types/offers';
import {userType} from '../types/user';
import {commentsType} from '../types/comment';
import {toast} from 'react-toastify';

import {parseOffers} from '../adapters/parse-offers';
import {parseAuthInfo} from '../adapters/parse-authInfo';
import {parseComments} from '../adapters/parse-comments';
import {parseOffer} from '../adapters/parse-offer';

import {saveToken} from '../services/token';

import {Dispatch, Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import { State } from '../types/state';
import { AxiosInstance , AxiosResponse} from 'axios';
import { SortItemType } from '../const';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';


export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillList = 'main/fillList',
  LoadOffers = 'server/loadOffers',
  GetAuth = 'server/getAuth',
  SendAuth = 'server/sendAuth',
  SetUser = 'server/setUser',
  SetComment = 'server/setComment',
  SetOffersNearby = 'server/setOffersNearby',
  SetSelectedOffer = 'server/setSelectOffer',
  SetError404 = 'server/setError404',
  SetHotelsFavorites ='server/setHotelsServer',
  SelectOfferForMap = 'map/selectOffer',
  SelectStateSort = 'main/selectStateSort',
  SetHotelFavorites = 'main/setHotelFavorites',
  CommentLoading = 'server/setCommentLoading',
}


export type selectCityType = {
  type: ActionType.ChangeCity,
  city: string,
  sortType: SortItemType,
}

export type fillListType = {
  type: ActionType.FillList,
  offers: Offers,
}

export type SelectOfferForMapType = {
  type: ActionType.SelectOfferForMap,
  activeOfferForMap: Offer,
}

export type getAuthType = {
  type: ActionType.GetAuth,
  authorizationStatus: boolean;
}

export type setUserType = {
  type: ActionType.SetUser,
  user: userType,
}

export type responseType = {
  data: OffersForAdapterTypes;
}

type setCommentsType = {
  type: ActionType.SetComment,
  comments: commentsType,
}

export type setHotelNearbyType = {
  type: ActionType.SetOffersNearby,
  offersNearby: Offers
}

export type setSelectOfferType = {
  type: ActionType.SetSelectedOffer,
  selectOffer: Offer,
}

export type setError404Type = {
  type: ActionType.SetError404,
  error404: boolean,
}

export type setTypeHotelsFavoritesType = {
  type: ActionType.SetHotelsFavorites,
  offersFavorites: Offers,
}

export type selectStateSortType = {
  type: ActionType.SelectStateSort,
  sortType: string,
}

export const loadOffers = (): ThunkAction<void, State, AxiosInstance, AnyAction> => (dispatch: ThunkDispatch<State, AxiosInstance, AnyAction >, _getState: () => State, api: AxiosInstance): void => {
  api.get('/hotels')
    .then((response: responseType) => {
      const formattedData = parseOffers(response.data);
      dispatch(fillList(formattedData));
    });
};

export const getAuthFromServer = (): ThunkAction<void, State, AxiosInstance, AnyAction> => (dispatch: ThunkDispatch<State, AxiosInstance, AnyAction >, _getState:  () => State, api: AxiosInstance): void => {
  api.get('/login')
    .then((response: AxiosResponse) => {
      if(response.status === 200){
        const formattedData = parseAuthInfo(response.data);
        saveToken(formattedData.token);
        dispatch(setUser(formattedData));
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }});
};

export const sendAuthToServer = (email: string, password: string) => (dispatch: Dispatch, _getState: () => State, api: AxiosInstance): void => {
  api.post('/login',{email, password})
    .then((response: AxiosResponse) => {
      if(response.status === 200) {
        const formattedData = parseAuthInfo(response.data);

        saveToken(formattedData.token);
        dispatch(setUser(formattedData));
        dispatch(setAuth(true));
      }
    },
    );
};

export const getComments = (id: number) => (dispatch: Dispatch, _getState: () => State, api: AxiosInstance): void => {
  api.get(`/comments/${id}`)
    .then((response: AxiosResponse) => {
      if(response.status === 200) {
        const formattedData = response.data;

        dispatch(setComments(parseComments(formattedData)));
      }
    });
};

export const getHotelNearby = (id: number) => (dispatch: Dispatch, _getState: () => State, api: AxiosInstance): void => {
  api.get(`/hotels/${id}/nearby`)
    .then((response: AxiosResponse) => {
      if(response.status === 200) {
        const formattedData = parseOffers(response.data);

        dispatch(setHotelNearby(formattedData));
      }
    });
};

export const getHotel = (id: number) => (dispatch: Dispatch, _getState: () => State, api: AxiosInstance): void => {
  api.get(`/hotels/${id}`)
    .then((response: AxiosResponse) => {
      if(response.status === 200) {
        const formatDate = parseOffer(response.data);

        dispatch(setError404(false));
        dispatch(setSelectOffer(formatDate));
      }
    })
    .catch((error: AxiosResponse) => {
      if(error) {
        dispatch(setError404(true));
      }});
};

export const deleteLogout = () => (dispatch: Dispatch, _getState: () => State, api: AxiosInstance): void => {
  api.delete('/logout')
    .then((response: AxiosResponse) => {
      if(response.status === 204) {
        dispatch(setAuth(false));
      }
    });
};

export const getHotelsFavorites = () => (dispatch: Dispatch, _getState: () => State, api: AxiosInstance): void => {
  api.get('/favorite')
    .then((response: AxiosResponse) => {
      if(response.status === 200) {
        const formatDate = parseOffers(response.data);

        dispatch(setHotelsFavorites(formatDate));
      }
    });
};

export const setStatusFavorites = (id: number, numberStatus: number, isFavoritesPage: boolean):ThunkAction<void, State, AxiosInstance, Action> => (dispatch: Dispatch, getState: () => State, api: AxiosInstance): void => {
  const {offers: allOffers, offersFavorites} = getState();
  const offers = isFavoritesPage? offersFavorites: allOffers;

  api.post(`/favorite/${id}/${numberStatus}`)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        const updatedOffer =  parseOffer(response.data);
        const updatedOfferIndex = offers?.findIndex((offer) => offer.id === updatedOffer.id);
        const isUpdateOffers = offers && (updatedOfferIndex !== undefined);

        if (isUpdateOffers) {
          offers.splice(updatedOfferIndex, 1, updatedOffer);
          if(isFavoritesPage){
            dispatch(setHotelsFavorites([...offers]));
          } else {
            dispatch(fillList(offers));
          }
        }
      }
    });
};

export const updateRoomOffer = (id: number, numberStatus: number):ThunkAction<void, State, AxiosInstance, Action> => (dispatch: Dispatch, getState: () => State, api: AxiosInstance): void => {
  const {offers} = getState();

  api.post(`/favorite/${id}/${numberStatus}`)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        const updatedOffer =  parseOffer(response.data);
        const updatedOfferIndex = offers?.findIndex((offer) => offer.id === updatedOffer.id);
        const isUpdateOffers = offers && (updatedOfferIndex !== undefined);

        dispatch(setSelectOffer(updatedOffer));

        if (isUpdateOffers) {
          offers.splice(updatedOfferIndex, 1, updatedOffer);
          dispatch(fillList(offers));
        }
      }
    },
    );
};


export const sendCommentOffer = (id: number, comment: string, rating: number) =>(dispatch: Dispatch, _getState: () => State, api: AxiosInstance): void => {
  dispatch(setCommentLoading(true));
  api.post(`/comments/${id}`, {comment, rating})
    .then((response:AxiosResponse) => {
      if(response.status === 200){

        const updatedComments = parseComments(response.data);

        dispatch(setComments(updatedComments));
      }
    })
    .catch((error: AxiosResponse) => {
      if(error) {
        toast.error('комментарий не отправлен');
      }
    })
    .finally(()=> dispatch(setCommentLoading(false)));
};

export const setCommentLoading = (isCommentLoading: boolean): AnyAction => ({
  type: ActionType.CommentLoading,
  isCommentLoading,
});


export const setHotelsFavorites = (offersFavorites: Offers): setTypeHotelsFavoritesType => ({
  type: ActionType.SetHotelsFavorites,
  offersFavorites,
});


export const setError404 = (error404: boolean): setError404Type => ({
  type: ActionType.SetError404,
  error404,
});

export const setSelectOffer = (selectOffer: Offer): setSelectOfferType => ({
  type: ActionType.SetSelectedOffer,
  selectOffer,
});

export const setHotelNearby = (offersNearby: Offers): setHotelNearbyType => ({
  type: ActionType.SetOffersNearby,
  offersNearby,
});

export const setComments = (comments: commentsType): setCommentsType => ({
  type: ActionType.SetComment,
  comments,
});


export const setUser = (user: userType):setUserType => ({
  type: ActionType.SetUser,
  user,
});

export const setAuth = (authorizationStatus: boolean): getAuthType => ({
  type: ActionType.GetAuth,
  authorizationStatus,
});

export const selectCity = (city: string): selectCityType => ({
  type: ActionType.ChangeCity,
  city,
  sortType: SortItemType.Popular,
});

export const fillList = (offers: Offers): fillListType => ({
  type: ActionType.FillList,
  offers,
});

export const SelectOfferForMap = (offer: Offer): SelectOfferForMapType => ({
  type: ActionType.SelectOfferForMap,
  activeOfferForMap: offer,
});


export const selectStateSort = (sortType: SortItemType): selectStateSortType => ({
  type: ActionType.SelectStateSort,
  sortType,
});
