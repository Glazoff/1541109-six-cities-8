import {Offers} from '../types/offers';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillList = 'main/fillList',
}

export type selectCityType = {
  type: ActionType.ChangeCity,
  city: string,
}

export type fillListType = {
  type: ActionType.FillList,
  offers: Offers,
}

export const selectCity = (city: string): selectCityType  => ({
  type: ActionType.ChangeCity,
  city,
});

export const fillList = (offers: Offers): fillListType => ({
  type: ActionType.FillList,
  offers,
});


