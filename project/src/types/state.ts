import {Offers, Offer} from './offers';
import {userType} from './user';

export type State = {
  titleCity: string;
  offers: Offers | null;
  activeOfferForMap: Offer | null;
  authorizationStatus: boolean;
  user: userType| null;
}
