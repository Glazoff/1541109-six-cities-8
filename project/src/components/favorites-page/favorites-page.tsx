import {Dispatch, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {FavoritesPageProps} from '../../types/types';
import {State} from '../../types/state';

import OfferListScreen from '../offer-list/offer-list';
import HeaderScreen from '../header/header';

import {getHotelsFavorites} from '../../store/action';

const mapStateToProps = ({offers,offersFavorites}: State) => ({
  offers,
  offersFavorites,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setOffersFavorites() {
    dispatch(getHotelsFavorites());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FavoritesPageProps;


function FavoritesPageScreen (props : ConnectedComponentProps): JSX.Element {
  const {setOffersFavorites, offersFavorites} = props;

  const citiesSet = new Set(offersFavorites?.map((offer) => offer.city.nameCity));

  const cities = [...citiesSet].sort().map((city) => (
    <li key={city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      {
        offersFavorites?
          <OfferListScreen
            offers={offersFavorites?.filter((offer) => offer.city.nameCity === city)}
            isFavoritesPage
            isRoomOfferPage={false}
          />:
          false
      }
    </li>
  ));

  useEffect(() => setOffersFavorites(),[]);

  return(
    <div className="page">
      <HeaderScreen/>

      {offersFavorites?.length === 0?
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
        :
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {cities}

              </ul>
            </section>
          </div>
        </main>}

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export {FavoritesPageScreen};
export default connector(FavoritesPageScreen);
