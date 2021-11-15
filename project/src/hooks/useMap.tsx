import {useEffect, useState, MutableRefObject} from 'react';

import {Map, TileLayer} from 'leaflet';

import {City} from '../types/offers';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city : City): Map | null {

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitudeCity,
          lng: city.location.longitudeCity,
        },
        zoom: 10,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'},
      );

      // eslint-disable-next-line no-console
      console.log(instance);

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;

