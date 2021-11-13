import {Offers, Offer} from './offers';

export type State = {
  titleCity: string;
  offers: Offers;
  activeOfferForMap: Offer | null;
}
