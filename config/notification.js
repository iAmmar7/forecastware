import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';

import { NOTIFICATION_INTERVAL, NOTIFICATION_JOB } from '../utils/constants';

export const init = () => {
  // Handle incoming notification
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
      };
    },
  });
};

export const scheduleNotification = async (
  content,
  delay = NOTIFICATION_INTERVAL,
  repeats = false,
) => {
  const identifier = await Notifications.scheduleNotificationAsync({
    content,
    trigger: {
      seconds: delay,
      repeats,
    },
  });
  return identifier;
};

export const registerBackgroundNotification = async (delay = NOTIFICATION_INTERVAL) => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(NOTIFICATION_JOB);
    if (isRegistered) return;

    await BackgroundFetch.registerTaskAsync(NOTIFICATION_JOB, {
      // minimumInterval: 30,
      minimumInterval: delay, // 15 minutes
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log(`${new Date().toISOString()}: Notification job has been registered!`);
  } catch (error) {
    console.log(`${new Date().toISOString()}: Error in registering the notification job `, error);
  }
};

export const unregisterBackgroundNotification = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(NOTIFICATION_JOB);
    if (!isRegistered) return;

    await BackgroundFetch.unregisterTaskAsync(NOTIFICATION_JOB);

    console.log(`${new Date().toISOString()}: Notification job has been unregistered!`);
  } catch (error) {
    console.log(`${new Date().toISOString()}: Error in unregistering the notification job `, error);
  }
};
