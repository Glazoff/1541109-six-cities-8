export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortItemType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const SortItem = [
  {
    value: SortItemType.Popular,
  },
  {
    value: SortItemType.PriceLowToHigh,
  },
  {
    value: SortItemType.PriceHighToLow,
  },
  {
    value: SortItemType.TopRatedFirst,
  },
];


export const MARKER_DEFAULT = '/img/pin.svg';

export const MARKER_CURRENT = '/img/pin-active.svg';
