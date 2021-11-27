import { memo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useHistory  } from 'react-router-dom';
import { SelectOfferForMap, setStatusFavorites} from '../../store/action';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';


import {OfferCardProps} from '../../types/types';
import { AppRoute, CommandFavorite } from '../../const';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, AxiosInstance, AnyAction>) => ({
  selectOffer (offer: Offer | null) {
    dispatch(SelectOfferForMap(offer));
  },
  setStatusFavoritesOffer(id: number, numberStatus: number, IsPage: string) {
    dispatch(setStatusFavorites(id, numberStatus, IsPage));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & OfferCardProps;

function OfferCardScreen(props : ConnectedComponentProps): JSX.Element {
  const {offer , isFavoritesPage, selectOffer, isRoomOfferPage, setStatusFavoritesOffer, authorizationStatus, isPage} = props;

  const history = useHistory();
  const {previewImage, isPremium, price, title, type, isFavorite, rating} = offer;

  const cardPath = `/offer/${offer.id}`;

  return (
    <article
      onMouseOver={() => isRoomOfferPage?null:selectOffer(offer)}
      onMouseOut={() => isRoomOfferPage?null:selectOffer(null)}
      className={`place-card ${isFavoritesPage? 'favorites__card' :'cities__place-card'}`}
    >
      {isPremium &&(
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${isFavoritesPage? 'favorites__image-wrapper' : 'cities__image-wrapper' }`}>
        <Link to={cardPath}>
          <img className="place-card__image" src={previewImage} width={isFavoritesPage? '150': '260'} height={isFavoritesPage? '110': '200'} alt="Place_image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {isFavorite?
            <button
              className={'place-card__bookmark-button button place-card__bookmark-button--active'}
              type="button"
              onClick={() => authorizationStatus?
                setStatusFavoritesOffer(offer.id, CommandFavorite.DeleteFavorite, isPage):
                history.push(AppRoute.SignIn)}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>:
            <button
              className={'place-card__bookmark-button button'}
              type="button"
              onClick={() => authorizationStatus?
                setStatusFavoritesOffer(offer.id, CommandFavorite.AddFavorite, isPage):
                history.push(AppRoute.SignIn)}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>}

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: Math.round(rating) * 15}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 >
          <Link to={cardPath}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export {OfferCardScreen};
export default memo(connector(OfferCardScreen));
