import { useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {sendAuthToServer} from '../../store/action';
import {Link, Redirect, Route} from 'react-router-dom';
import {State} from '../../types/state';
import {AppRoute} from '../../const';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {toast} from 'react-toastify';


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

    //Регулярка взята из https://www.w3resource.com/javascript/form/email-validation.php
    //Стандарт по ссылке https://www.rfc-editor.org/rfc/rfc2822#section-3.4.1
    // eslint-disable-next-line no-control-regex
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (email?.current?.value.match(emailRegex)  && password?.current?.value){

      setAuth(email.current.value, password.current.value);
    } else {
      //to do выкинуть тост
      toast.error('невверный логин или пароль');
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

