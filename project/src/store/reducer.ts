import {AnyAction} from 'redux';

import {State} from '../types/state';

import {ActionType} from '../store/action';

import {SortItemType} from '../const';


export const initialState: State = {
  titleCity: 'Paris',
  offers: null,
  offersFavorites: null,
  activeOfferForMap: null,
  authorizationStatus: false,
  user: null,
  comments: null,
  offersNearby: null,
  selectOffer: null,
  error404: false,
  stateSortOffers: SortItemType.Popular,
  sortOffers: null,
  isCommentLoading: false,
};

export const reducer = (state: State = initialState, action: AnyAction): State => {
  switch(action.type) {
    case ActionType.ChangeCity:
      return {...state, titleCity:  action.city, stateSortOffers: action.sortType};
    case ActionType.FillList:
      return {...state, offers: action.offers};
    case ActionType.SetHotelsFavorites:
      return {...state, offersFavorites: action.offersFavorites};
    case ActionType.SelectOfferForMap:
      return {...state, activeOfferForMap: action.activeOfferForMap};
    case ActionType.GetAuth:
      return {...state, authorizationStatus: action.authorizationStatus};
    case ActionType.SetUser:
      return {...state, user: action.user};
    case ActionType.SetComment:
      return {...state, comments: action.comments};
    case ActionType.SetOffersNearby:
      return {...state, offersNearby: action.offersNearby};
    case ActionType.SetSelectedOffer:
      return {...state, selectOffer: action.selectOffer};
    case ActionType.SetError404:
      return {...state, error404: action.error404};
    case ActionType.SelectStateSort:
      return {...state, stateSortOffers: action.sortType};
    case ActionType.CommentLoading:
      return {...state,  isCommentLoading:  action.isCommentLoading};
    default:
      return state;
  }
};
