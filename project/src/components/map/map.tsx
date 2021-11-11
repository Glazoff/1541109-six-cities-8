import {useRef, useEffect} from 'react';

import {MapProps} from '../../types/types';

import useMap from '../../hooks/useMap';

import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {MARKER_DEFAULT, MARKER_CURRENT} from '../../const';

const defaultCustomIcon = new Icon({
  iconUrl: MARKER_DEFAULT,
  iconSize: [40, 50],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: MARKER_CURRENT,
  iconSize: [40, 50],
  iconAnchor: [20, 40],
});

function Map({offers, points, selectPoint} : MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectPoint && point.title === selectPoint.title
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectPoint]);


  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
