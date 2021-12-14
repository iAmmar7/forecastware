import * as Notifications from 'expo-notifications';

import { NOTIFICATION_INTERVAL } from '../utils/constants';

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
