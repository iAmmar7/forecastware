import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import StartupComponent from './Startup.component';
import { useUserContext, useLocationContext } from '../../hooks';
import { fetchCurrentLocationWeather } from '../../api';
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
    addLocation(weather, true);
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
