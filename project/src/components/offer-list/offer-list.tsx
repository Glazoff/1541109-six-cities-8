import { useState } from 'react';

import OfferCardScreen from '../offer-card/offer-card';

import {OfferListProps} from '../../types/types';

function OfferListScreen ({offers, isFavoritesPage} : OfferListProps): JSX.Element{
  const [, setActiveOffer] = useState(offers[0].id);

  return (
    <div className={`${ isFavoritesPage ? 'favorites__places' : 'cities__places-list places__list tabs__content'}`}>

      {
        offers.map((offer) => <OfferCardScreen offer={offer} key={offer.id} onMouseEnter={()=>setActiveOffer(offer.id)} isFavoritesPage = {isFavoritesPage}/>)
      }

    </div>
  );
}

export default OfferListScreen;
