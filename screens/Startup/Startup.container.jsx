import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import StartupComponent from './Startup.component';
import { useUserContext, useLocationContext } from '../../hooks';
import { fetchCurrentLocationWeather } from '../../api';
import { startLocationTracking } from '../../config';
import { isArray, isEmpty } from '../../utils/helpers';

function StartupContainer(props) {
  const { navigation } = props;
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [{ setCurrentLocation, unit }, { locations, fetchLocations, addLocation }] = [
    useUserContext(),
    useLocationContext(),
  ];

  useEffect(() => {
    (async () => {
      const dbLocations = await fetchLocations();
      if (isArray(dbLocations) && isEmpty(dbLocations)) {
        hanldeAskLocation();
        return;
      }
      if (isArray(dbLocations) && !isEmpty(dbLocations)) {
        navigation.replace('Home');
      }
    })();
  }, []);

  const hanldeAskLocation = async () => {
    const foregroundPermission = await Location.requestForegroundPermissionsAsync();
    if (foregroundPermission.status === 'granted') {
      setPermissionDenied(false);

      const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
      if (backgroundPermission.status === 'granted') {
        startLocationTracking();
      }

      const location = await Location.getCurrentPositionAsync({});
      const coordinates = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };
      // Fetch current location weather from the API
      const weather = await fetchCurrentLocationWeather(coordinates, unit);
      setCurrentLocation(location);
      addLocation(weather, true);
      navigation.replace('Home');
      return;
    }
    setPermissionDenied(true);
  };

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
