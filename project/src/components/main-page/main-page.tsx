import {connect, ConnectedProps} from 'react-redux';

import OfferListScreen from '../offer-list/offer-list';
import LoaderScreen from '../loader/loader';
import Map from '../map/map';
import HeaderScreen from '../header/header';

import {MainPageProps} from '../../types/types';
import {State} from '../../types/state';

import {selectCityType, fillListType, fillList, selectCity} from '../../store/action';
import {Offers} from '../../types/offers';
import {Dispatch} from 'react';


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
type ConnectedComponentProps = PropsFromRedux & MainPageProps;

function MainPageScreen(props: ConnectedComponentProps): JSX.Element {
  const {offers, onChangeCity, titleCity} = props;


  return offers ? (
    <div className="page page--gray page--main">
      <HeaderScreen/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a
                  className="locations__item-link tabs__item"
                  onClick={() => onChangeCity('Paris')}
                  href="#"
                >
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a
                  className="locations__item-link tabs__item"
                  onClick={() => onChangeCity('Cologne')}
                  href="#"
                >
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a
                  className="locations__item-link tabs__item"
                  onClick={() => onChangeCity('Brussels')}
                  href="#"
                >
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a
                  className="locations__item-link tabs__item tabs__item--active"
                  onClick={() => onChangeCity('Amsterdam')}
                  href="#"
                >
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a
                  className="locations__item-link tabs__item"
                  onClick={() => onChangeCity('Hamburg')}
                  href="#"
                >
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a
                  className="locations__item-link tabs__item"
                  onClick={() => onChangeCity('Dusseldorf')}
                  href="#"
                >
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {titleCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferListScreen
                offers={offers}
                isFavoritesPage={false}
                isRoomOfferPage={false}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  points={offers}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  ): <LoaderScreen/>;
}

export {MainPageScreen};
export default connector(MainPageScreen);
