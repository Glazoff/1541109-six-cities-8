import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {deleteLogout} from '../../store/action';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';


const mapStateToProps = ({authorizationStatus, user}: State) => ({
  authorizationStatus,
  user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, AxiosInstance, AnyAction>) => ({
  signOut() {
    dispatch(deleteLogout());
  },
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function HeaderScreen (props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, user, signOut} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            {authorizationStatus ?
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user?.email}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to={'/'} className="header__nav-link" onClick={signOut}> {/* TODO */}
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>:
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>

                    <span className="header__login">Sign in</span>

                  </Link>
                </li>
              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );
}

export {HeaderScreen};
export default connector(HeaderScreen);
