import OfferCardScreen from '../offer-card/offer-card';

import {OfferListProps} from '../../types/types';

function OfferListScreen ({offers, isFavoritesPage, isRoomOfferPage, isPage} : OfferListProps): JSX.Element{
  return isRoomOfferPage? (
    <div className="near-places__list places__list">
      {
        offers.map((offer) => (
          <OfferCardScreen
            offer={offer}
            key={offer.id}
            isFavoritesPage = {isFavoritesPage}
            isRoomOfferPage
            isPage={isPage}
          />
        ),
        )
      }
    </div>)
    :(
      <div className={`${ isFavoritesPage ? 'favorites__places' : 'cities__places-list places__list tabs__content'}`}>

        {
          offers.map((offer) => (
            <OfferCardScreen
              offer={offer}
              key={offer.id}
              isFavoritesPage = {isFavoritesPage}
              isRoomOfferPage={false}
              isPage={isPage}
            />
          ),
          )
        }

      </div>
    );
}

export default OfferListScreen;
