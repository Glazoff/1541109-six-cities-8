import {useRef, useEffect} from 'react';

import {MapProps} from '../../types/types';

import useMap from '../../hooks/useMap';

import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {MARKER_DEFAULT, MARKER_CURRENT} from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';


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

const mapStateToProps = ({activeOfferForMap, offers}: State) => ({
  activeOfferForMap,
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;

function Map(props : ConnectedComponentProps): JSX.Element {
  const {points, activeOfferForMap} = props;


  const city = points[0].city;


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
            activeOfferForMap && point.title === activeOfferForMap.title
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, activeOfferForMap]);


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
