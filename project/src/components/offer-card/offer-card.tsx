import { Link } from 'react-router-dom';

import {OfferCardProps} from '../../types/types';

function OfferCardScreen({offer, onMouseEnter, isFavoritesPage} : OfferCardProps): JSX.Element {
  const {previewImage, isPremium, price, title, type, isFavorite, rating} = offer;

  const widthRating = `${(100 * rating)/5.0}%`;

  const cardPath = `/offer/${offer.id}`;

  return(
    <article onMouseEnter={onMouseEnter} className={`place-card ${isFavoritesPage? 'favorites__card' :'cities__place-card'}`}>
      {isPremium &&(
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${isFavoritesPage? 'favorites__image-wrapper' : 'cities__image-wrapper' }`}>
        <Link to={cardPath}>
          <img className="place-card__image" src={previewImage} width={isFavoritesPage? '150': '260'} height={isFavoritesPage? '110': '200'} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active': ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: widthRating}}></span>
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

export default OfferCardScreen;
