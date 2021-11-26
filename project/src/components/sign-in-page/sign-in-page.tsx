import { useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {sendAuthToServer} from '../../store/action';
import {Link, Redirect, Route} from 'react-router-dom';
import {State} from '../../types/state';
import {AppRoute} from '../../const';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, AxiosInstance, AnyAction>) => ({
  setAuth(email: string, password: string) {
    dispatch(sendAuthToServer(email, password));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux ;

function SignInScreen(props: ConnectedComponentProps): JSX.Element {
  const {setAuth, authorizationStatus} = props;

  const emailInput = useRef<HTMLInputElement | null >(null);
  const passwordInput = useRef<HTMLInputElement | null >(null);

  function sendAuth (email: React.MutableRefObject<HTMLInputElement | null>, password: React.MutableRefObject<HTMLInputElement | null>) {
    if (email?.current?.value  && password?.current?.value){

      setAuth(email.current.value, password.current.value);
    }
  }


  return authorizationStatus ?
    <Route>
      <Redirect to={AppRoute.Main}/>
    </Route>
    :
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={(instance) => emailInput.current = instance}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={(instance) => passwordInput.current = instance}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={(evt) => {
                  evt.preventDefault();
                  sendAuth(emailInput, passwordInput);
                }}
              >
                  Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>;
}

export {SignInScreen};
export default connector(SignInScreen);

