import {OffersForAdapterTypes, OffersForAdapterType, Offers} from '../types/offers';

import {parseOffer} from './parse-offer';

export const parseOffers = (offers: OffersForAdapterTypes): Offers => offers.map((offer: OffersForAdapterType) => parseOffer(offer));
