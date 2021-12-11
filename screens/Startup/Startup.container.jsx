import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StartupComponent from './Startup.component';
import { useUserContext, useLocationContext } from '../../hooks';
import { fetchCurrentLocationWeather } from '../../api';
import { isEmpty } from '../../utils/helpers';

function StartupContainer(props) {
  const { navigation } = props;
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [{ setCurrentLocation, unit }, { locations, fetchLocations, addLocation }] = [
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
    addLocation(weather, true);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    (async () => {
      const locationFromStorage = await AsyncStorage.getItem('location');
      if (isEmpty(locations) && !locationFromStorage) {
        hanldeAskLocation();
        return;
      }

      if (!isEmpty(locations)) navigation.replace('Home');
    })();
  }, [locations.length]);

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
