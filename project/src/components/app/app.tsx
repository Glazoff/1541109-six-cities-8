import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {AppScreenProps} from '../../types/types';
import {AppRoute, AuthorizationStatus} from '../../const';

import MainPageScreen from '../main-page/main-page';
import SignInScreen from '../sign-in-page/sign-in-page';
import FavoritesPageScree from '../favorites-page/favorites-page';
import RoomOfferScreen from '../room-offer-page/room-offer-page';
import Error404Screen from '../error-404-page/error-404-page';
import PrivateRoute from '../private-route/private-route';


function App({offerCount, offers} : AppScreenProps): JSX.Element {


  return  (
    <BrowserRouter>
      <Switch>
        <Route  path={AppRoute.Main} exact>
          <MainPageScreen
            offerCount={offerCount}
            offers={offers}
          />
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignInScreen />
        </Route>
        <PrivateRoute
          path={AppRoute.Favorites}
          exact
          renderPage={() => <FavoritesPageScree/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
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

export default App;
