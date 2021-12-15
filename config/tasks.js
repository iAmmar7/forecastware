/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Battery from 'expo-battery';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { scheduleNotification } from './notifications';
import { updateCurrentLocation, fetchCurrentLocations } from './db';
import { fetchCurrentLocationWeather } from '../api';
import { isEmpty, getTemperatureSymbol } from '../utils/helpers';
import {
  APP_NAME,
  LOCATION_JOB,
  LOCATION_JOB_INTERVAL,
  MINIMUM_BATTERY_LIMIT,
} from '../utils/constants';

export const init = () => {
  TaskManager.defineTask(LOCATION_JOB, async ({ data, error }) => {
    try {
      console.log('Location job has started!');

      if (error) throw new Error(error);

      // Check the battery status
      const batteryLevel = await Battery.getBatteryLevelAsync();

      // Stop the job and remove the notification if battery level is less than 20
      if (batteryLevel * 100 < MINIMUM_BATTERY_LIMIT) {
        await Notifications.dismissAllNotificationsAsync();
        await stopLocationTracking();
        await scheduleNotification(
          {
            title: `${APP_NAME} tracker`,
            body: `The app has stopped working due to low battery!`,
          },
          10,
        );
        return;
      }

      // Extract location data
      const location = data?.locations?.[(data.locations?.length || 1) - 1] || null;
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
      if (isEmpty(weather)) return;

      // Fetch current location data from the database
      const dbResponse = await fetchCurrentLocations();
      if (!dbResponse || isEmpty(dbResponse?.rows?._array)) return;
      const dbLocation = dbResponse?.rows?._array[0];
      const dbLocationData = JSON.parse(dbLocation.data);

      // Send a notification if the new temperature is not same as old
      const dbWeatherTemp = Math.round(dbLocationData.current.temp || 0);
      const apiWeatherTemp = Math.round(weather.current.temp || 0);
      if (dbWeatherTemp !== apiWeatherTemp) {
        await Notifications.dismissAllNotificationsAsync();
        await scheduleNotification(
          {
            title: APP_NAME,
            body: `Temperature has changed: ${apiWeatherTemp}${getTemperatureSymbol(
              unitFromStorage,
            )}!`,
          },
          10,
        );
      }

      // Update the location in DB
      await updateCurrentLocation(weather);

      return BackgroundFetch.Result.NewData;
    } catch (err) {
      console.error('Location job error', err);
      return BackgroundFetch.Result.Failed;
    }
  });
};

export const startLocationTracking = async () => {
  try {
    console.log('Location tracking started!');
    Location.startLocationUpdatesAsync(LOCATION_JOB, {
      accuracy: Location.Accuracy.Balanced,
      // timeInterval: 10000,
      distanceInterval: LOCATION_JOB_INTERVAL,
      deferredUpdatesInterval: 10000,

      // Not running in background without foregroundService
      foregroundService: {
        notificationTitle: `${APP_NAME} tracker`,
        notificationBody: 'Using location service to monitor the weather!',
      },
    });
  } catch (error) {
    console.log('Error in starting the location tracker: ', error);
  }
};

export const stopLocationTracking = async () => {
  try {
    console.log('Location tracking stopped!');
    const location = await Location.hasStartedLocationUpdatesAsync(LOCATION_JOB);
    if (location) {
      Location.stopLocationUpdatesAsync(LOCATION_JOB);
    }
  } catch (error) {
    console.log('Error in stopping the location tracker: ', error);
  }
};
