/* eslint-disable no-console */
import {Dispatch, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {sendAuthToServer} from '../../store/action';
import {} from '../../types/state';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<>) => ({
  setAuth(email: string, password: string) {
    dispatch(sendAuthToServer(email, password));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux ;

function SignInScreen(props: ConnectedComponentProps): JSX.Element {
  const {setAuth} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return(
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
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
                  onChange={(evt) => setEmail(evt.target.value)}
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
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={(evt) => {
                  evt.preventDefault();
                  setAuth(email, password);
                  console.log(email, password);
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
    </div>
  );
}

export {SignInScreen};
export default connector(SignInScreen);

