import {OffersForAdapterType, Offer} from '../types/offers';

export const parseOffer = (offer: OffersForAdapterType): Offer => {
  const {
    bedrooms,
    city: {
      location: {
        latitude: latitudeCity,
        longitude: longitudeCity,
        zoom: zoomCity,
      },
      name: nameCity,
    },
    description,
    goods,
    host: {
      avatar_url: avatarUrl,
      id: idHost,
      is_pro: isPro,
      name,
    },
    id,
    images,
    is_favorite: isFavorite,
    is_premium: isPremium,
    location: {
      latitude,
      longitude,
      zoom,
    },
    max_adults: maxAdults,
    preview_image: previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  return ({
    bedrooms,
    city: {
      location: {
        latitudeCity,
        longitudeCity,
        zoomCity,
      },
      nameCity,
    },
    description,
    goods,
    host: {
      avatarUrl,
      idHost,
      isPro,
      name,
    },
    id,
    images,
    isFavorite,
    isPremium,
    location: {
      latitude,
      longitude,
      zoom,
    },
    maxAdults,
    previewImage,
    price,
    rating,
    title,
    type,
  });
};
