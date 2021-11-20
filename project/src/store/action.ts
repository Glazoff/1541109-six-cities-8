import {Offer, Offers, OffersForAdapterTypes} from '../types/offers';
import {userType} from '../types/user';
import {commentsType} from '../types/comment';

import {parseOffers} from '../adapters/parse-offers';
import {parseAuthInfo} from '../adapters/parse-authInfo';
import {parseComments} from '../adapters/parse-comments';
import {parseOffer} from '../adapters/parse-offer';

import {saveToken} from '../services/token';


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
}


export type selectCityType = {
  type: ActionType.ChangeCity,
  city: string,
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

export const loadOffers = () => (dispatch: any, _getState: any, api: any) => {
  api.get('/hotels')
    .then((response: responseType) => {
      const formattedData = parseOffers(response.data);
      dispatch(fillList(formattedData));
    });
};

export const getAuthFromServer = () => (_dispatch: any, _getState: any, api: any) => {
  api.get('/login')
    .then();
};

export const sendAuthToServer = (email: string, password: string) => (dispatch: any, _getState: any, api: any) => {
  api.post('/login',{email, password})
    .then((response: any) => {
      if(response.status === 200) {
        const formattedData = parseAuthInfo(response.data);

        saveToken(formattedData.token);
        dispatch(setUser(formattedData));
        dispatch(setAuth(true));
      }
    },
    );
};

export const getComments = (id: number) => (dispatch: any, _getState: any, api: any) => {
  api.get(`/comments/${id}`)
    .then((response: any) => {
      if(response.status === 200) {
        const formattedData = response.data;

        dispatch(setComments(parseComments(formattedData)));
      }
    });
};

export const getHotelNearby = (id: number) => (dispatch: any, _getState: any, api: any) => {
  api.get(`/hotels/${id}/nearby`)
    .then((response: any) => {
      if(response.status === 200) {
        const formattedData = parseOffers(response.data);

        dispatch(setHotelNearby(formattedData));
      }
    });
};

export const getHotel = (id: number) => (dispatch: any, _getState: any, api: any) => {
  api.get(`/hotels/${id}`)
    .then((response: any) => {
      if(response.status === 200) {
        const formatDate = parseOffer(response.data);

        dispatch(setError404(false));
        dispatch(setSelectOffer(formatDate));
      }
    })
    .catch((error: any) => {
      if(error) {
        dispatch(setError404(true));
      }});
};

export const deleteLogout = () => (dispatch: any, _getState: any, api: any) => {
  api.delete('/logout')
    .then((response: any) => {
      if(response.status === 204) {
        dispatch(setAuth(false));
      }
    });
};

export const getHotelsFavorites = () => (dispatch: any, _getState: any, api: any) => {
  api.get('/favorite')
    .then((response: any) => {
      if(response.status === 200) {
        const formatDate = parseOffers(response.data);
        // eslint-disable-next-line no-console
        console.log(response);

        dispatch(setHotelsFavorites(formatDate));
      }
    });
};

export const setStatusFavorites = (id: number, numberStatus: number) => (dispatch: any, _getState: any, api: any) => {
  api.post(`/favorite/${id}/${numberStatus}`)
    .then((response: any) => {
      if (response.status === 200) {
        // eslint-disable-next-line no-console
        console.log('сменили стату предложения'); //todo
        loadOffers();
      }
    });
};

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
});

export const fillList = (offers: Offers): fillListType => ({
  type: ActionType.FillList,
  offers,
});

export const SelectOfferForMap = (offer: Offer): SelectOfferForMapType => ({
  type: ActionType.SelectOfferForMap,
  activeOfferForMap: offer,
});
