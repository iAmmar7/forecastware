/* eslint-disable consistent-return */
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Battery from 'expo-battery';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { updateCurrentLocation } from './db';
import { fetchCurrentLocationWeather } from '../api';
import { LOCATION_JOB, LOCATION_JOB_INTERVAL, MINIMUM_BATTERY_LIMIT } from '../utils/constants';
import { isEmpty } from '../utils/helpers';

export const init = () => {
  TaskManager.defineTask(LOCATION_JOB, async ({ data, error }) => {
    try {
      if (error) {
        console.debug('LOCATION_JOB error', error);
        return;
      }

      // Check the battery status
      const batteryLevel = await Battery.getBatteryLevelAsync();

      // Stop the job and remove the notification if battery level is less than 20
      if (batteryLevel * 100 < MINIMUM_BATTERY_LIMIT) {
        await Notifications.dismissAllNotificationsAsync();
        await stopLocationTracking();
      }

      // Extract location data
      const location = data?.locations[0] || null;
      if (isEmpty(location)) return;

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

      return BackgroundFetch.Result.NewData;
    } catch (err) {
      console.error('LOCATION_JOB error', err);
      return BackgroundFetch.Result.Failed;
    }
  });
};

export const startLocationTracking = async () => {
  console.log('Location tracking stared!');
  Location.startLocationUpdatesAsync(LOCATION_JOB, {
    accuracy: Location.Accuracy.BestForNavigation,
    // timeInterval: 10000,
    distanceInterval: LOCATION_JOB_INTERVAL,
    deferredUpdatesInterval: 10000,

    // Not running in background without foregroundService
    foregroundService: {
      notificationTitle: 'ForecastWare tracker',
      notificationBody: 'Using location service to generate weather report!',
    },
  });
};

export const stopLocationTracking = async () => {
  console.log('Location tracking stopped!');
  const location = await Location.hasStartedLocationUpdatesAsync(LOCATION_JOB);
  if (location) {
    Location.stopLocationUpdatesAsync(LOCATION_JOB);
  }
};
