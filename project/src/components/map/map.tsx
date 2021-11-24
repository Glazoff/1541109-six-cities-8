import {useRef, useEffect} from 'react';

import {MapProps} from '../../types/types';

import useMap from '../../hooks/useMap';

import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {MARKERS_MAP} from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';


const defaultCustomIcon = new Icon({
  iconUrl: MARKERS_MAP.MarkerDefault,
  iconSize: [40, 50],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: MARKERS_MAP.MarkerCurrent,
  iconSize: [40, 50],
  iconAnchor: [20, 40],
});

const mapStateToProps = ({activeOfferForMap}: State) => ({
  activeOfferForMap,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;

function Map(props : ConnectedComponentProps): JSX.Element {
  const {points, activeOfferForMap} = props;


  const city = points[0].city;

  // eslint-disable-next-line no-debugger
  // debugger;
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
            activeOfferForMap && point.location === activeOfferForMap.location
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, activeOfferForMap, city]);

  useEffect(() => {
    map?.setView([city.location.latitudeCity, city.location.longitudeCity],city.location.zoomCity);
  }, [city]);

  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );
}

export {Map};
export default connector(Map);
