import {connect, ConnectedProps} from 'react-redux';

import OfferListScreen from '../offer-list/offer-list';
import LoaderScreen from '../loader/loader';
import Map from '../map/map';
import HeaderScreen from '../header/header';

import {State} from '../../types/state';

import {selectCityType, fillListType, fillList, selectCity} from '../../store/action';
import {Offers} from '../../types/offers';
import {Dispatch} from 'react';

import SortItemScreen from '../sort-item/sort-item';

import {SortItemType, CityList} from '../../const';


const setSortOffers = (offers: Offers | undefined, typeSort: string | null, originalSort: Offers | undefined) => {
  if(offers && typeSort && originalSort) {

    switch (typeSort) {
      case SortItemType.PriceHighToLow:
        return offers.sort((a, b) => b.price - a.price);
      case SortItemType.PriceLowToHigh:
        return offers.sort((a, b) => a.price - b.price);
      case SortItemType.TopRatedFirst:
        return offers.sort((a, b) => b.rating - a.rating);
      default:
        return originalSort;
    }
  }
};

const mapStateToProps = ({titleCity, offers, stateSortOffers, sortOffers}: State) => ({
  titleCity,
  stateSortOffers,
  offers,
  sortOffers: setSortOffers(
    offers?.filter((offer) => offer.city.nameCity === titleCity),
    stateSortOffers,
    offers?.filter((offer) => offer.city.nameCity === titleCity)),
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

function MainPageScreen(props: PropsFromRedux): JSX.Element {
  const {onChangeCity, titleCity, sortOffers} = props;


  return sortOffers ? (
    <div className="page page--gray page--main">
      <HeaderScreen/>

      {sortOffers.length === 0?
        <main className="page__main page__main--index page__main--index-empty">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                {
                  CityList.map((city) => (
                    <li
                      key={city.cityName}
                      className="locations__item"
                    >
                      <a
                        className={`locations__item-link tabs__item ${city.cityName === titleCity? 'tabs__item--active': false}`}
                        onClick={() => onChangeCity(city.cityName)}
                        href="#"
                      >
                        <span>{city.cityName}</span>
                      </a>
                    </li>))
                }
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        </main>:
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">

                {
                  CityList.map((city) => (
                    <li
                      key={city.cityName}
                      className="locations__item"
                    >
                      <a
                        className={`locations__item-link tabs__item ${city.cityName === titleCity? 'tabs__item--active': false}`}
                        onClick={() => onChangeCity(city.cityName)}
                        href="#"
                      >
                        <span>{city.cityName}</span>
                      </a>
                    </li>))
                }

              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortOffers.length} places to stay in {titleCity}</b>

                <SortItemScreen/>

                <OfferListScreen
                  offers={sortOffers}
                  isFavoritesPage={false}
                  isRoomOfferPage={false}
                />

              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    points={sortOffers}
                  />
                </section>
              </div>
            </div>
          </div>
        </main>}

    </div>
  ): <LoaderScreen/>;
}

export {MainPageScreen};
export default connector(MainPageScreen);
