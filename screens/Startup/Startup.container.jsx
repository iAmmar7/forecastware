import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import StartupComponent from './Startup.component';

const StartupContainer = () => {
  useEffect(() => {
    (async () => {
      let position = await Location.requestForegroundPermissionsAsync();
      if (position.status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      AsyncStorage.setItem('location', JSON.stringify(location));
    })();
  }, []);

  return <StartupComponent />;
};

export default StartupContainer;
