/* eslint-disable camelcase */
export type City = {
   location: {
      latitudeCity: number,
      longitudeCity: number,
      zoomCity: number
    },
    nameCity: string
}

export type Host = {
  avatarUrl: string,
  idHost: number,
  isPro: boolean,
  name: string
}

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number
}

export type  Offer = {
  bedrooms: number,
  city: City,
  description: string ,
  goods: string[],
  host: Host,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type OffersForAdapterType= {
  bedrooms: number,
    city: {
      location: {
        latitude: number,
        longitude: number,
        zoom: number,
      },
      name: string,
    },
    description: string,
    goods: string[],
    host: {
      avatar_url: string,
      id: number,
      is_pro: boolean,
      name: string,
    },
    id: number,
    images: string[],
    is_favorite: boolean,
    is_premium: boolean,
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    },
    max_adults: number,
    preview_image: string,
    price: number,
    rating: number,
    title: string,
    type: string,
}

export type OffersForAdapterTypes = OffersForAdapterType[];

export type Offers = Offer[];
