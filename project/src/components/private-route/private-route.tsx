import {Route, Redirect} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';

import {PrivateRouteProps} from '../../types/types';

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, renderPage, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? renderPage()
          : <Redirect to={AppRoute.SignIn}/>
      )}
    >
    </Route>
  );
}

export default PrivateRoute;
