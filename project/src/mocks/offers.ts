import {Offer} from '../types/offers';

export const offers: Offer[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 3,
      isPro: false,
      name: 'Angelina',
    },
    id: 1,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 2,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.0,
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 7,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 4,
      isPro: true,
      name: 'Philip',
    },
    id: 2,
    images: ['img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 3.0,
    title: 'Wood and stone place',
    type: 'Private room',
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 23,
      isPro: true,
      name: 'Angelina',
    },
    id: 5,
    images: ['img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
    maxAdults: 2,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 4.0,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
    id: 6,
    images: ['img/apartment-01.jpg', 'img/room.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
    maxAdults: 5,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 5.0,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
];

export const favoritesOffers = offers.filter((offer) => offer.isFavorite);
