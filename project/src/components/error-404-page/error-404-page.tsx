import {Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Error404Screen(): JSX.Element {
  return(
    <Fragment>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>На главную</Link>
    </Fragment>
  );
}

export default Error404Screen;
