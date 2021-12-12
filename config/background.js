import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { updateCurrentLocation } from './db';
import { fetchCurrentLocationWeather } from '../api';
import { LOCATION_JOB, LOCATION_JOB_INTERVAL } from '../utils/constants';
import { isEmpty } from '../utils/helpers';

export const init = () => {
  TaskManager.defineTask(LOCATION_JOB, async ({ data, error }) => {
    if (error) {
      console.debug('LOCATION_JOB error', error);
      return;
    }

    const location = data?.locations[0] || null;
    if (isEmpty(location)) return;

    try {
      // Set new location to Async Storage
      AsyncStorage.setItem('location', JSON.stringify({ location }));

      // Get user preferred temperature unit
      const unitFromStorage = await AsyncStorage.getItem('unit');

      // Fetch current location weather from the API
      const weather = await fetchCurrentLocationWeather(
        location.coords,
        unitFromStorage || 'Celsius',
      );

      // Update the location in DB
      await updateCurrentLocation(weather);

      console.log('Location updated from the job!!');
    } catch (err) {
      console.error('LOCATION_JOB error', err);
    }
  });
};

export const registerNotification = async () => {
  return BackgroundFetch.registerTaskAsync(LOCATION_JOB, {
    minimumInterval: 1, // 1 minute
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
};

export const startLocationTracking = () => {
  console.log('Location job registered!');
  Location.startLocationUpdatesAsync(LOCATION_JOB, {
    accuracy: Location.Accuracy.BestForNavigation,
    // timeInterval: 10000,
    distanceInterval: LOCATION_JOB_INTERVAL, // minimum change (in meters) betweens updates
    deferredUpdatesInterval: 10000, // minimum interval (in milliseconds) between updates
    // Not running in background without foregroundService
    foregroundService: {
      notificationTitle: 'ForecastWare tracker',
      notificationBody: 'Using location service to generate weather report!',
    },
  });
};
