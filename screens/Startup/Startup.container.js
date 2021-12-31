import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import { useUserContext, useLocationContext } from 'forecastware/hooks';
import { fetchCurrentLocationWeather } from 'forecastware/api';
import { startLocationTracking, registerBackgroundNotification } from 'forecastware/config';
import { isArray, isEmpty } from 'forecastware/utils/helpers';
import StartupComponent from './Startup.component';

function StartupContainer(props) {
  const { navigation } = props;
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [{ setCurrentLocation, unit }, { locations, fetchLocations, addLocation, updateLocation }] =
    [useUserContext(), useLocationContext()];

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setTimeout(() => {
          setModalVisible(true);
        }, 1000);
        return;
      }
      handleAskPermissions();
    })();
  }, []);

  const handleAskPermissions = async () => {
    setModalVisible(false);

    // Check and ask for Foreground location permission
    const foregroundPermission = await Location.requestForegroundPermissionsAsync();
    if (foregroundPermission.status === 'granted') {
      setPermissionDenied(false);

      // Ask for Background location permission
      const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
      if (backgroundPermission.status === 'granted') {
        await startLocationTracking();
      }

      // Ask for Notification permission
      const notificationPermission = await Notifications.requestPermissionsAsync();
      if (notificationPermission.status === 'granted') {
        await registerBackgroundNotification();
      }

      // Get and Save location to AsyncStorage
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);

      // Fetch current location weather from the API
      const weather = await fetchCurrentLocationWeather(location.coords, unit);

      // Fetch locations from the database to check if current location already exist
      const dbLocations = await fetchLocations();
      const currentLocationIndex = dbLocations.findIndex((loc) => loc?.isCurrent);

      // If already exist then update otherwise add
      if (currentLocationIndex > -1) {
        await updateLocation(weather);
      } else {
        await addLocation(weather, true);
      }
      navigation.replace('Home');
      return;
    }

    // Check if the DB has locations. If no, then show snackbar and ask permissions again
    const dbLocations = await fetchLocations();
    if (isArray(dbLocations) && !isEmpty(dbLocations)) {
      navigation.replace('Home');
    } else {
      setPermissionDenied(true);
    }
  };

  const handleSnackbar = () => setPermissionDenied(false);

  return (
    <StartupComponent
      snackbarVisible={permissionDenied && isEmpty(locations)}
      handleSnackbar={handleSnackbar}
      handleAskPermissions={handleAskPermissions}
      modalVisible={modalVisible}
    />
  );
}

StartupContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default StartupContainer;
