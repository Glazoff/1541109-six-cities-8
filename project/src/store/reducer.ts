import {AnyAction} from 'redux';

import {State} from '../types/state';

import {ActionType} from '../store/action';


export const initialState: State = {
  titleCity: 'Paris',
  offers: [],
};

export const reducer = (state: State = initialState, action: AnyAction): State => {
  switch(action.type) {
    case ActionType.ChangeCity:
      return {...state, titleCity:  action.city};
    case ActionType.FillList:
      return {...state, offers: action.offers};
    default:
      return state;
  }
};
