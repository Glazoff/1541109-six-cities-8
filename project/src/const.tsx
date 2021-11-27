export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum SortItemType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const SortItems = [
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

export enum CityListType {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const CityList = [
  {
    cityName: CityListType.Paris,
  },
  {
    cityName: CityListType.Cologne,
  },
  {
    cityName: CityListType.Brussels,
  },
  {
    cityName: CityListType.Amsterdam,
  },
  {
    cityName: CityListType.Hamburg,
  },
  {
    cityName: CityListType.Dusseldorf,
  },
];

export const COUNTS_RATING = [
  {star: 5},
  {star: 4},
  {star: 3},
  {star: 2},
  {star: 1},
];

export enum MarkersMap {
  MarkerDefault = '/img/pin.svg',
  MarkerCurrent = 'img/pin-active.svg'
}

export enum CommandFavorite {
  AddFavorite = 1,
  DeleteFavorite = 0,
}

export enum RestrictionForInput {
  MaxInit = 300,
  MiniInit = 50,
  EmptyStart = '',
}

export const enum IsPage {
  PageMain = 'PageMain',
  PageFavorites = 'PageFavorites',
  PageRoomOffer = 'PageRoomOffer',
}

export enum ToastMessage {
  ErrorComments ='Комментарий не отправлен',
  ErrorEmailPassword = 'Невверный логин или пароль',
  ErrorAuth = 'Ошибка при авторизации',
}

export enum HttpCode {
  Unauthorized = 401,
  OK = 200,
  LoggedOut = 204,
}


