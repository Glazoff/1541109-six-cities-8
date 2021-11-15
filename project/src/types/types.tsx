import {RouteProps} from 'react-router-dom';

import {Offers, Offer} from './offers';

export type MainPageProps = {
  offerCount: number;
}

export type AppProps = {
  offerCount: number;
}

export type OfferCardProps = {
  offer: Offer;
  isFavoritesPage: boolean;
}

export type OfferListProps = {
  offers: Offers;
  isFavoritesPage: boolean;
}

export type FavoritesPageProps = {
}

export type RoomOfferProps = {
}

export type PrivateRouteProps = RouteProps & {
  renderPage: () => JSX.Element;
}

export type MapProps = {
  points: Offers;
}
