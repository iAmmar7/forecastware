import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useUserContext } from 'forecastware/hooks';
import { API_KEY, FALLBACK_LONGITUDE, FALLBACK_LATITUDE } from 'forecastware/utils/constants';
import { useCallback } from 'react/cjs/react.development';
import MapComponent from './Map.component';

function MapContainer(props) {
  const { navigation } = props;
  const { currentLocation } = useUserContext();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [layerType, setLayerType] = useState('temp_new');
  const [region, setRegion] = useState({
    latitude: currentLocation.latitude || FALLBACK_LATITUDE,
    longitude: currentLocation.longitude || FALLBACK_LONGITUDE,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [urlTemplate, setUrlTemplate] = useState(
    `https://tile.openweathermap.org/map/temp_new/0/0/0.png?appid=${API_KEY}`,
  );

  const toggleOptions = () => setOptionsVisible((prev) => !prev);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeLayerType = useCallback((value) => {
    setOptionsVisible(false);
    setLayerType(value);
    setUrlTemplate(`https://tile.openweathermap.org/map/${value}/0/0/0.png?appid=${API_KEY}`);
  }, []);

  return (
    <MapComponent
      currentLocation={currentLocation}
      layerType={layerType}
      region={region}
      urlTemplate={urlTemplate}
      optionsVisible={optionsVisible}
      toggleOptions={toggleOptions}
      handleBack={handleBack}
      handleChangeLayerType={handleChangeLayerType}
    />
  );
}

MapContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MapContainer;
