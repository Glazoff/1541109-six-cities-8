import {RouteProps} from 'react-router-dom';

import {Offers, Offer} from './offers';

import {commentsType, commentType} from './comment';

export type OfferCardProps = {
  offer: Offer;
  isFavoritesPage: boolean;
  isRoomOfferPage: boolean;
  currentPage: string;
}

export type OfferListProps = {
  offers: Offers ;
  isFavoritesPage: boolean;
  isRoomOfferPage: boolean;
  currentPage: string;
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
