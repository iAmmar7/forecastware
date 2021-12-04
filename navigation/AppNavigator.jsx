import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AllNavigators from './AllNavigators';
import { StartupScreen } from '../screens';
import { useLocationContext } from '../hooks';
import { isEmpty } from '../utils/helpers';

const AppNavigator = ({ theme }) => {
  const { locations } = useLocationContext();

  return (
    <NavigationContainer theme={theme}>
      {/* {!isEmpty(location) && isReady ? <AllNavigators /> : <StartupScreen />} */}
      {/* {!isEmpty(locations) ? <AllNavigators /> : <StartupScreen />} */}
      {locations.length > 1 ? <AllNavigators /> : <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
