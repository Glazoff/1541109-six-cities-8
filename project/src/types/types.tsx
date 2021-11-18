import {RouteProps} from 'react-router-dom';

import {Offers, Offer} from './offers';

import {commentsType, commentType} from './comment';

export type MainPageProps = {
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
  isRoomOfferPage: boolean;
}

export type FavoritesPageProps = {
}

export type RoomOfferProps = {
}

export type ReviewsListType = {
  comments: commentsType
}

export type ReviewsCardType = {
  commentProps: commentType
}

export type PrivateRouteProps = RouteProps & {
  renderPage: () => JSX.Element;
}

export type MapProps = {
  points: Offers;
}
