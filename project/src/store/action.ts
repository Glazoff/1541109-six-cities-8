import {Offer, Offers, OffersForAdapterTypes} from '../types/offers';

import {parseOffers} from '../adapters/parse-offers';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillList = 'main/fillList',
  LoadOffers = 'server/loadOffers',
  GetAuth = 'server/getAuth',
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

export type responseType = {
  data: OffersForAdapterTypes;
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

export const sendAuthToServer = (email: string, password: string) => (_dispatch: any, _getState: any, api: any) => {
  api.post('/login',{email, password})
    .then();
};


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
