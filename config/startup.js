import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { startLocationTracking } from './tasks';

// eslint-disable-next-line import/prefer-default-export
export const init = async () => {
  // Ask for Foreground location permission
  const foregroundPermission = await Location.requestForegroundPermissionsAsync();
  if (foregroundPermission.status === 'granted') {
    // Get and Save location to AsyncStorage
    const location = await Location.getCurrentPositionAsync({});
    AsyncStorage.setItem('location', JSON.stringify({ location }));

    // Ask for Background location permission
    const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
    if (backgroundPermission.status === 'granted') {
      startLocationTracking();
    }
  }
};
