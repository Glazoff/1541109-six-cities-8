import {RouteProps} from 'react-router-dom';

import {Offers, Offer} from './offers';

import {AuthorizationStatus} from '../const';

export type MainPageProps = {
  offerCount: number;
}

export type AppProps = {
  offerCount: number;
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
}

export type RoomOfferProps = {
}

export type PrivateRouteProps = RouteProps & {
  renderPage: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

export type MapProps = {
  offers: Offers;
  points: Offers;
  selectPoint: Offer | null;
}
