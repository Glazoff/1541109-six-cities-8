import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import { Dispatch } from 'react';
import {deleteLogout} from '../../store/action';


const mapStateToProps = ({authorizationStatus, user}: State) => ({
  authorizationStatus,
  user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
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
            <a className="header__logo-link header__logo-link--active" href="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            {authorizationStatus ?
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user?.email}</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/" onClick={() => signOut}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>:
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <Link to={AppRoute.SignIn}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </a>
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
