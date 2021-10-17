import {RouteProps} from 'react-router-dom';

import {Offers, Offer} from './offers';

import {AuthorizationStatus} from '../const';

export type MainPageProps = {
  offerCount: number,
  offers: Offers,
}

export type AppScreenProps = {
  offerCount: number,
  offers: Offers,
}

export type OfferCardScreenProps = {
  offer: Offer,
}

export type PrivateRouteProps = RouteProps & {
  renderPage: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}
