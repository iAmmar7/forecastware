import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AllNavigators from './AllNavigators';
import { StartupScreen } from '../screens';
import { isEmpty } from '../utils/helpers';

const AppNavigator = ({ theme }) => {
  const [location, setLocation] = useState(null);
  //   const [isReady, setIsReady] = useState(false);

  const fetchLocation = async () => {
    const location = await AsyncStorage.getItem('location');
    setLocation(JSON.parse(location));
  };

  useEffect(() => {
    fetchLocation();
    //   setTimeout(() => {
    //     setIsReady(true);
    //   }, 2000);
  }, []);

  return (
    <NavigationContainer theme={theme}>
      {/* {!isEmpty(location) && isReady ? <AllNavigators /> : <StartupScreen />} */}
      {!isEmpty(location) ? <AllNavigators /> : <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
