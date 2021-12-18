/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Battery from 'expo-battery';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { scheduleNotification } from './notification';
import { stopLocationTracking } from './location';
import { updateCurrentLocation, fetchCurrentLocations } from './db';
import { fetchCurrentLocationWeather } from '../api';
import { isEmpty, getTemperatureSymbol } from '../utils/helpers';
import {
  temperatureUnits,
  APP_NAME,
  LOCATION_JOB,
  MINIMUM_BATTERY_LIMIT,
  NOTIFICATION_JOB,
} from '../utils/constants';

// eslint-disable-next-line import/prefer-default-export
export const init = () => {
  TaskManager.defineTask(LOCATION_JOB, async ({ data, error }) => {
    try {
      console.log(`${new Date().toISOString()}: Location job started!`);

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
      if (isEmpty(location)) throw new Error('No locations were received!');

      // Set new location to Async Storage
      AsyncStorage.setItem('location', JSON.stringify({ location }));

      // Get user preferred temperature unit
      const unitFromStorage = await AsyncStorage.getItem('unit');

      // Fetch current location weather from the API
      const weather = await fetchCurrentLocationWeather(
        location.coords,
        unitFromStorage || temperatureUnits.CELSIUS,
      );
      if (isEmpty(weather)) throw new Error('Unable to fetch the weather!');

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

      console.log(`${new Date().toISOString()}: Location job completed!`);

      return BackgroundFetch.Result.NewData;
    } catch (err) {
      console.error(`${new Date().toISOString()}: Error in location job `, err);
      return BackgroundFetch.Result.Failed;
    }
  });

  TaskManager.defineTask(NOTIFICATION_JOB, async () => {
    try {
      console.log(`${new Date().toISOString()}: Notification job started!`);

      // Get current user location
      const locationFromStorage = await AsyncStorage.getItem('location');
      const location = JSON.parse(locationFromStorage || {})?.location;
      if (isEmpty(location)) throw new Error('Location not found!');

      // Get user preferred temperature unit
      const unitFromStorage = await AsyncStorage.getItem('unit');

      // Fetch current location weather from the API
      const weather = await fetchCurrentLocationWeather(
        location.coords,
        unitFromStorage || temperatureUnits.CELSIUS,
      );
      if (isEmpty(weather) || isEmpty(weather.current))
        throw new Error('Unable to fetch the weather!');

      // Send a notification with latest weather report
      await Notifications.dismissAllNotificationsAsync();
      await scheduleNotification(
        {
          title: APP_NAME,
          body: `Temperature: ${Math.round(weather.current.temp)}${getTemperatureSymbol(
            unitFromStorage,
          )}!, Humidity: ${weather.current.humidity}, Clouds: ${weather.current.clouds}`,
        },
        5,
      );

      console.log(`${new Date().toISOString()}: Notification job completed!`);

      return BackgroundFetch.Result.NoData;
    } catch (error) {
      console.error(`${new Date().toISOString()}: Error in notification job `, error);
      return BackgroundFetch.Result.Failed;
    }
  });
};
