import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const NOTIFICATION_TASK = 'notification-task';

export const initTasks = () => {
  TaskManager.defineTask(NOTIFICATION_TASK, async () => {
    const now = Date.now();

    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });
};

export const registerNotification = async () => {
  return BackgroundFetch.registerTaskAsync(NOTIFICATION_TASK, {
    minimumInterval: 1, // 1 minute
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
};
