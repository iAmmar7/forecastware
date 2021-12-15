import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

import { APP_NAME, LOCATION_JOB, LOCATION_JOB_INTERVAL } from '../utils/constants';

export const startLocationTracking = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_JOB);
    if (isRegistered) return;

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

    console.log(`${new Date().toISOString()}: Location job has been registered!`);
  } catch (error) {
    console.log(`${new Date().toISOString()}: Error in registering the location job `, error);
  }
};

export const stopLocationTracking = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_JOB);
    if (!isRegistered) return;

    const location = await Location.hasStartedLocationUpdatesAsync(LOCATION_JOB);
    if (location) {
      await Location.stopLocationUpdatesAsync(LOCATION_JOB);
    }

    console.log(`${new Date().toISOString()}: Location job has been unregistered!`);
  } catch (error) {
    console.log(`${new Date().toISOString()}: Error in unregistering the location job `, error);
  }
};
