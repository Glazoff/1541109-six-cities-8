import {useState} from 'react';

import OfferCardScreen from '../offer-card/offer-card';

import {OfferListProps} from '../../types/types';
import {Offer} from '../../types/offers';

function OfferListScreen ({offers, isFavoritesPage, listItemHoverHandler} : OfferListProps): JSX.Element{
  const [activeOffer, setActiveOffer] = useState(offers[0].id);

  const pointToOffer = (activeCard: number, offer: Offer) => {
    setActiveOffer(offer.id);

    const currentPoint = offers.find((point) => point.id === activeCard);

    if(listItemHoverHandler) {
      listItemHoverHandler(currentPoint as Offer);
    }
  };

  return (
    <div className={`${ isFavoritesPage ? 'favorites__places' : 'cities__places-list places__list tabs__content'}`}>

      {
        offers.map((offer) => (
          <OfferCardScreen
            offer={offer}
            key={offer.id}
            onHoverHandler={() => pointToOffer(activeOffer, offer)}
            isFavoritesPage = {isFavoritesPage}
          />
        ),
        )
      }

    </div>
  );
}

export default OfferListScreen;
