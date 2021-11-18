import {Dispatch} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {FavoritesPageProps} from '../../types/types';
import {Offers} from '../../types/offers';
import {State} from '../../types/state';
import {selectCityType, fillListType, fillList, selectCity} from '../../store/action';

import LoaderScreen from '../loader/loader';
import OfferListScreen from '../offer-list/offer-list';
import HeaderScreen from '../header/header';


const mapStateToProps = ({titleCity, offers}: State) => ({
  titleCity,
  offers: offers?.filter((offer) => offer.city.nameCity === titleCity),
});

const mapDispatchToProps = (dispatch: Dispatch<selectCityType | fillListType>) => ({
  onChangeCity(titleCity: string ) {
    dispatch(selectCity(titleCity));
  },
  onLoad(offers: Offers) {
    dispatch(fillList(offers));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FavoritesPageProps;


function FavoritesPageScreen (props : ConnectedComponentProps): JSX.Element {
  const {offers} = props;

  return offers ? (
    <div className="page">
      <HeaderScreen/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <OfferListScreen offers={offers} isFavoritesPage isRoomOfferPage={false}/>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  ): <LoaderScreen/>;
}

export {FavoritesPageScreen};
export default connector(FavoritesPageScreen);
