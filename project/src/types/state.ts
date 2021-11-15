import {Offers, Offer} from './offers';
import {userType} from './user';
import {commentsType} from './comment';

export type State = {
  titleCity: string;
  offers: Offers | null;
  activeOfferForMap: Offer | null;
  authorizationStatus: boolean;
  user: userType| null;
  comments: commentsType| null;
}
