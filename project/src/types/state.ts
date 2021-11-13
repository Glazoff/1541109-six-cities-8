import {Offers, Offer} from './offers';

export type State = {
  titleCity: string;
  offers: Offers | null;
  activeOfferForMap: Offer | null;
  authorizationStatus: boolean;
}
