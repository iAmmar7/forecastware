import * as Notifications from 'expo-notifications';

import { notificationDelay } from '../utils/constants';

// eslint-disable-next-line import/prefer-default-export
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

export const scheduleNotification = (content) => {
  Notifications.scheduleNotificationAsync({
    content,
    trigger: {
      seconds: 60 * notificationDelay,
      repeats: true,
    },
  });
};
