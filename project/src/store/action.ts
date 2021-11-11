import {Offers, OffersForAdapterTypes} from '../types/offers';

import {parseOffers} from '../adapters/parse-offers';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillList = 'main/fillList',
  LoadOffers = 'server/loadOffers'
}

export type selectCityType = {
  type: ActionType.ChangeCity,
  city: string,
}

export type fillListType = {
  type: ActionType.FillList,
  offers: Offers,
}

export type loadOffersType = {
  type: ActionType.LoadOffers,
}

export type responseType = {
  data: OffersForAdapterTypes;
}

export const loadOffers = () => (dispatch: any, _getState: any, api: any) => {
  // eslint-disable-next-line no-console
  console.log(api);
  api.get('/hotels')
    .then((response: responseType) => {
      const formattedData = parseOffers(response.data);
      dispatch(fillList(formattedData));
    });
};

export const selectCity = (city: string): selectCityType => ({
  type: ActionType.ChangeCity,
  city,
});

export const fillList = (offers: Offers): fillListType => ({
  type: ActionType.FillList,
  offers,
});


