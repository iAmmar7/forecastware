import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import StartupComponent from './Startup.component';
import { useUserContext, useLocationContext } from '../../hooks';
import { fallBackLatitude, fallBackLongitude } from '../../utils/constants';
import { fetchWeatherFromCoordinates } from '../../api';

const StartupContainer = () => {
  const [{ currentLocation, setCurrentLocation, clearCurrentLocation, unit }, { addLocation }] = [
    useUserContext(),
    useLocationContext(),
  ];

  useEffect(() => {
    (async () => {
      if (!currentLocation) {
        const coordinates = {
          longitude: fallBackLongitude,
          latitude: fallBackLatitude,
        };
        const position = await Location.requestForegroundPermissionsAsync();
        if (position.status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location);
          coordinates.longitude = location.coords.longitude;
          coordinates.latitude = location.coords.latitude;
        }
        // Fetch current location weather from the API
        const weather = await fetchWeatherFromCoordinates(coordinates, unit);
        addLocation(weather);
      } else {
        // TODO: Fetch all the locations from DB
        clearCurrentLocation();

        // TOUNDO: Temporary fetching the weather of Karachi
        const weather = await fetchWeatherFromCoordinates(
          {
            longitude: fallBackLongitude,
            latitude: fallBackLatitude,
          },
          unit
        );
        addLocation(weather);
      }
    })();
  }, []);

  return <StartupComponent />;
};

export default StartupContainer;
