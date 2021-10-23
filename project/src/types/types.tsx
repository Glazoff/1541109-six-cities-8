import {RouteProps} from 'react-router-dom';

import {Offers, Offer} from './offers';

import {AuthorizationStatus} from '../const';

export type MainPageProps = {
  offerCount: number;
  offers: Offers;
}

export type AppProps = {
  offerCount: number;
  offers: Offers;
  favoritesOffers: Offers;
}

export type OfferCardProps = {
  offer: Offer;
  onMouseEnter:() => void;
  isFavoritesPage: boolean;
}

export type OfferListProps = {
  offers: Offers;
  isFavoritesPage: boolean;
}

export type FavoritesPageProps = {
  offers: Offers;
}

export type RoomOfferProps = {
  offers: Offers;
}

export type PrivateRouteProps = RouteProps & {
  renderPage: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}
