import { connect, ConnectedProps } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {AppRoute} from '../../const';
import {State} from '../../types/state';

import {PrivateRouteProps} from '../../types/types';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});


const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {exact, path, renderPage, authorization, authorizationStatus} = props;

  // eslint-disable-next-line no-console
  console.log(authorization);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === false
          ? renderPage()
          : <Redirect to={AppRoute.SignIn}/>
      )}
    >
    </Route>
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
