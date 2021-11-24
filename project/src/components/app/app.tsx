import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';

import {AppRoute} from '../../const';

import MainPageScreen from '../main-page/main-page';
import SignInScreen from '../sign-in-page/sign-in-page';
import FavoritesPageScreen from '../favorites-page/favorites-page';
import RoomOfferScreen from '../room-offer-page/room-offer-page';
import Error404Screen from '../error-404-page/error-404-page';
import PrivateRoute from '../private-route/private-route';
import {State} from '../../types/state';

const mapStateToProps = ({error404}: State) => ({
  error404,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function App(props: PropsFromRedux): JSX.Element {

  return  (
    <BrowserRouter>
      <Switch>
        <Route  path={AppRoute.Main} exact>
          <MainPageScreen/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignInScreen />
        </Route>
        <PrivateRoute
          path={AppRoute.Favorites}
          exact
          renderPage={() => <FavoritesPageScreen/>}
        >
        </PrivateRoute>
        <Route path={AppRoute.Room} exact>
          <RoomOfferScreen/>
        </Route>
        <Route>
          <Error404Screen/>
        </Route>
      </Switch>
    </BrowserRouter>);
}

export {App};
export default connector(App);

