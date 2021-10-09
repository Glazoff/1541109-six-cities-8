import {RouteProps} from 'react-router-dom';

import {AuthorizationStatus} from '../const';

export type MainPageProps = {
  offerCount: number;
}

export type AppScreenProps = {
  offerCount: number;
}

export type PrivateRouteProps = RouteProps & {
  renderPage: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}
