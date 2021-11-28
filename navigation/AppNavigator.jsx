import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AllNavigators from './AllNavigators';
import { StartupScreen } from '../screens';
import { useUserContext } from '../hooks';
import { isEmpty } from '../utils/helpers';

const AppNavigator = ({ theme }) => {
  const { location } = useUserContext();

  return (
    <NavigationContainer theme={theme}>
      {/* {!isEmpty(location) && isReady ? <AllNavigators /> : <StartupScreen />} */}
      {!isEmpty(location) ? <AllNavigators /> : <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
