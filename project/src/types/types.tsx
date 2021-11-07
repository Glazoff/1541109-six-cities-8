import {RouteProps} from 'react-router-dom';

import {Offers, Offer, City} from './offers';

import {AuthorizationStatus} from '../const';

export type MainPageProps = {
  offerCount: number;
}

export type AppProps = {
  offerCount: number;
  favoritesOffers: Offers;
}

export type OfferCardProps = {
  offer: Offer;
  onHoverHandler:() => void;
  isFavoritesPage: boolean;
}

export type OfferListProps = {
  offers: Offers;
  listItemHoverHandler?:(offer: Offer) => void;
  isFavoritesPage: boolean;
}

export type FavoritesPageProps = {
  offers: Offers;
}

export type RoomOfferProps = {
}

export type PrivateRouteProps = RouteProps & {
  renderPage: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

export type MapProps = {
  city: City;
  points: Offers;
  selectPoint: Offer | null;
}
