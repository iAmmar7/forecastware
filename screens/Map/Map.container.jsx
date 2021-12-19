import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useUserContext } from 'forecastware/hooks';
import { API_KEY, FALLBACK_LONGITUDE, FALLBACK_LATITUDE } from 'forecastware/utils/constants';
import MapComponent from './Map.component';

function MapContainer(props) {
  const { navigation } = props;
  const { currentLocation } = useUserContext();
  const [region, setRegion] = useState({
    latitude: currentLocation.latitude || FALLBACK_LATITUDE,
    longitude: currentLocation.longitude || FALLBACK_LONGITUDE,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [urlTemplate, setUrlTemplate] = useState(
    `https://tile.openweathermap.org/map/temp_new/0/0/0.png?appid=${API_KEY}`,
  );

  const handleLeftIconClick = () => {
    navigation.goBack();
  };

  return (
    <MapComponent
      currentLocation={currentLocation}
      region={region}
      urlTemplate={urlTemplate}
      handleLeftIconClick={handleLeftIconClick}
    />
  );
}

MapContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MapContainer;
