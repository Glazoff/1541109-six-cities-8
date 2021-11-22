import {Offers, Offer} from './offers';
import {userType} from './user';
import {commentsType} from './comment';

export type State = {
  titleCity: string;
  offers: Offers | null;
  offersFavorites: Offers | null;
  activeOfferForMap: Offer | null;
  authorizationStatus: boolean;
  user: userType| null;
  comments: commentsType| null;
  offersNearby: Offers | null;
  selectOffer: Offer | null;
  error404: boolean;
  stateSortOffers: string | null;
  sortOffers: Offer | null;
  isCommentLoading: boolean;
}
