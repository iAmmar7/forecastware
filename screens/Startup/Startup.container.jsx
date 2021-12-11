import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import StartupComponent from './Startup.component';
import { useUserContext, useLocationContext } from '../../hooks';
import { fetchCurrentLocationWeather } from '../../api';
import { isEmpty } from '../../utils/helpers';

function StartupContainer(props) {
  const { navigation } = props;
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [{ currentLocation, setCurrentLocation, unit }, { locations, addLocation }] = [
    useUserContext(),
    useLocationContext(),
  ];

  const hanldeAskLocation = async () => {
    const position = await Location.requestForegroundPermissionsAsync();
    if (position.status !== 'granted') {
      setPermissionDenied(true);
      return;
    }
    setPermissionDenied(false);

    const location = await Location.getCurrentPositionAsync({});
    const coordinates = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    };
    // Fetch current location weather from the API
    const weather = await fetchCurrentLocationWeather(coordinates, unit);
    setCurrentLocation(location);
    addLocation(weather);
    navigation.replace('Home');
  };

  useEffect(() => {
    if (currentLocation && !isEmpty(locations)) {
      navigation.replace('Home');
      return;
    }
    hanldeAskLocation();
  }, []);

  const handleSnackbar = () => setPermissionDenied(false);

  return (
    <StartupComponent
      snackbarVisible={permissionDenied && isEmpty(locations)}
      handleSnackbar={handleSnackbar}
      hanldeAskLocation={hanldeAskLocation}
    />
  );
}

StartupContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default StartupContainer;
