import {Dispatch, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {connect, ConnectedProps} from 'react-redux';

import {State} from '../../types/state';
import {Offer} from '../../types/offers';
import {RoomOfferProps} from '../../types/types';

import CommentFormScreen from '../comment-form/comment-form';
import ReviewsListScreen from '../reviews-list/reviews-list';
import Map from '../map/map';
import OfferListScreen from '../offer-list/offer-list';
import LoaderScreen from '../loader/loader';
import HeaderScreen from '../header/header';

import {getComments, getHotelNearby, getHotel, SelectOfferForMap, setStatusFavorites} from '../../store/action';
import Error404Screen from '../error-404-page/error-404-page';
import { AppRoute } from '../../const';


const mapStateToProps = ({titleCity, offers, comments, offersNearby, selectOffer, error404, authorizationStatus}: State) => ({
  titleCity,
  offers,
  comments,
  selectOffer,
  offersNearby,
  error404,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setOfferSelect(id: number) {
    dispatch(getHotel(id));
  },
  setComments(id: number) {
    dispatch(getComments(id));
  },
  setOffersNearby(id: number) {
    dispatch(getHotelNearby(id));
  },
  selectOfferMap (offer: Offer) {
    dispatch(SelectOfferForMap(offer));
  },
  setStatusFavoritesOffer(id: number, numberStatus: number) {
    dispatch(setStatusFavorites(id, numberStatus));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & RoomOfferProps;

function RoomOfferScreen(props: ConnectedComponentProps): JSX.Element {
  const {setComments, comments, setOffersNearby, offersNearby, setOfferSelect, selectOffer, error404, selectOfferMap, authorizationStatus, setStatusFavoritesOffer} = props;

  const {id} = useParams<{id: string}>();

  const history = useHistory();


  useEffect(() => {
    setOfferSelect(Number(id));
    setComments(Number(id));
    setOffersNearby(Number(id));
  },[]);

  if(error404) {
    return(
      <Error404Screen/>
    );
  }

  if (!selectOffer) {
    return <div></div>;
  }

  selectOfferMap(selectOffer);


  const {bedrooms, images, isPremium, title, rating, type, maxAdults, price, goods, host, description, isFavorite} = selectOffer;

  const widthRating = `${(100 * rating)/5.0}%`;

  offersNearby?.push(selectOffer);


  return offersNearby && comments ? (
    <div className="page">
      <HeaderScreen/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              { images.map((image?:  string) => (
                <div className="property__image-wrapper" key={`${id+image}`}>
                  <img className="property__image" src={image} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div  className="property__mark">
                  <span>Premium</span>
                </div>)}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                {isFavorite?
                  <button
                    className="property__bookmark-button button property__bookmark-button--active"
                    type="button"
                    onClick={() => authorizationStatus?
                      setStatusFavoritesOffer(selectOffer.id, 0):
                      history.push(AppRoute.SignIn)}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>:
                  <button
                    className="property__bookmark-button button"
                    type="button"
                    onClick={() => authorizationStatus?
                      setStatusFavoritesOffer(selectOffer.id, 1):
                      history.push(AppRoute.SignIn)}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>}


              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: widthRating}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li className="property__inside-item" key={`${id+good}`}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="property__user-status">
                    Pro
                    </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsListScreen
                  comments={comments}
                />
                {authorizationStatus?<CommentFormScreen id={id}/>: false}

              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              points={offersNearby}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OfferListScreen
              offers={offersNearby}
              isFavoritesPage={false}
              isRoomOfferPage
            />

          </section>
        </div>
      </main>
    </div>
  ): <LoaderScreen/>;
}

export {RoomOfferScreen};
export default connector(RoomOfferScreen);

